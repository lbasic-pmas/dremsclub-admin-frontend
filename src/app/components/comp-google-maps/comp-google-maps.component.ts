import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-comp-google-maps',
  templateUrl: './comp-google-maps.component.html',
  styleUrls: ['./comp-google-maps.component.scss']
})
export class CompGoogleMapsComponent implements OnInit {
  @ViewChild( 'inputSearch' , {static: false} ) inputSearch!: ElementRef<any>;
  @Input() datos: any;
  @Output() llamarAccion = new EventEmitter<any>();

  loader: any;
  mapOptions: any;
  
  lat: any = -33.441479;
  lng: any = -70.642785;

  // apiKeyGoogle = environment.apiKeyGoogle;
  constructor() { }

  async ngOnInit() {
    let getLocation = await this.getUserLocation();
    if ( getLocation ) {
      this.generateMap();
    }
    this.inputSearch.nativeElement.value = this.datos.location;
  }

  generateMap( ) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBmxI7qcqFUBSXboE1O75brC-s5hprKaSg',
      version: "weekly",
      libraries: ["places"]
    });
    this.mapOptions = {
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: 17
    };

    this.loader.load()
      .then((google: any) => {
        const map = document.getElementById( 'map' );
        const mapa = new google.maps.Map( map , this.mapOptions );
        const pin = new google.maps.Marker({ position: { lat: this.lat, lng: this.lng }, map: mapa });

        const informacion = new google.maps.InfoWindow();

        const geocoder = new google.maps.Geocoder();
        mapa.addListener( 'click' , ( mapsMouseEvent: any ) => {
          informacion.close();

          pin.setPosition( mapsMouseEvent.latLng );
          pin.setVisible( true );

          geocoder.geocode({
            location: mapsMouseEvent.latLng //trae las coordenadas
          }).then((success: any) => {              
              // obtengo latitud y longitud
              const json = mapsMouseEvent.latLng.toJSON();
              this.saveLocation( json );
          }).catch((err: any) => {
              console.log( err )
          });
        });

        const search = new google.maps.places.Autocomplete( document.getElementById( 'autocomplete' ) );
        search.bindTo( 'bounds' , mapa );
        search.addListener( 'place_changed', () => {
          pin.setVisible( false );

          const place = search.getPlace();
          pin.setVisible( true );
          pin.setPosition( place.geometry.location , this.mapOptions );

          const center = new google.maps.LatLng( place.geometry.location );
          mapa.panTo( center );
          // obtengo latitud y longitud
          this.saveLocation( center.toJSON() );
        });
      })
      .catch((e: any) => {
        // do something
      }
    );
  }

  saveLocation( location: any  ) {
    this.lat = location.lat;
    this.lng = location.lng;
    this.llamarAccion.emit( { TARGET: 'GEO' , INFO: { LAT: this.lat , LNG: this.lng , SEARCH: this.inputSearch.nativeElement.value } } );
  }



  getUserLocation() {
    return new Promise( resolve => {
      if ( this.datos.lat !== 0 ) {
        this.lat = this.datos.lat;
        this.lng = this.datos.lng;
        resolve( true );
      } else {
        if ( navigator.geolocation ) {
          navigator.geolocation.getCurrentPosition(position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            resolve( true );
          });
        } else {
          resolve( true );
        }
      }
    });


    
    
  }

}
