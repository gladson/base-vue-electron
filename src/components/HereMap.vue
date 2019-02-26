<template>
    <div class="here-map">
        <div ref="map" id="map"></div>
    </div>
</template>

<script>
export default {
    name: "HereMap",
    data() {
        return {
            map: {},
            platform: {},
            router: {},
            geocoder: {},
            directions: [],
            ui: {}
        }
    },
    props: {
        appId: String,
        appCode: String,
        lat: String,
        lng: String
    },
    created() {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.router = this.platform.getRoutingService();
        this.geocoder = this.platform.getGeocodingService();
    },
    mounted() {
        var pixelRatio = window.devicePixelRatio || 1;
        let defaultLayers = this.platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
        });
        this.map = new H.Map(
            this.$refs.map,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lng: this.lng, lat: this.lat },
                pixelRatio: pixelRatio
            }
        );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    },
    methods: {
      getCoordinates(query) {
          return new Promise((resolve, reject) => {
              this.geocoder.geocode({ searchText: query }, data => {
                  if(data.Response.View[0].Result.length > 0) {
                      data = data.Response.View[0].Result.map(location => {
                          return {
                              lat: location.Location.DisplayPosition.Latitude,
                              lng: location.Location.DisplayPosition.Longitude
                          };
                      });
                      resolve(data);
                  } else {
                      reject({ "message": "No data found" });
                  }
              }, error => {
                  reject(error);
              });
          });
      },
      route(start, range) {
        var params = {
            "mode": "fastest;car;traffic:enabled",
            "range": range,
            "rangetype": "time",
            "departure": "now"
        }
        this.map.removeObjects(this.map.getObjects());
        this.getCoordinates(start).then(geocoderResult => {
            params["start"] = geocoderResult[0].lat + "," + geocoderResult[0].lng;
            this.router.calculateIsoline(params, data => {
                if(data.response) {
                    var center = new H.geo.Point(data.response.center.latitude, data.response.center.longitude),
                        isolineCoords = data.response.isoline[0].component[0].shape,
                        linestring = new H.geo.LineString(),
                        isolinePolygon,
                        isolineCenter;
                    isolineCoords.forEach(coords => {
                        linestring.pushLatLngAlt.apply(linestring, coords.split(','));
                    });
                    isolinePolygon = new H.map.Polygon(linestring);
                    isolineCenter = new H.map.Marker(center);
                    this.map.addObjects([isolineCenter, isolinePolygon]);
                    this.map.setViewBounds(isolinePolygon.getBounds());
                }
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
      }
    }
}
</script>

<style scoped></style>