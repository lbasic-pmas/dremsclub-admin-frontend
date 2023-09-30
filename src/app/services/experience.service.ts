import { Injectable } from '@angular/core';
import { CallService } from './call.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(  private _callService: CallService ) { }

  getAll( pageSize: number , pageNum: number , filter: string ) {
    let pagination = `?page_size=${pageSize}&page_num=${pageNum}`;
    return this._callService.getQuery( `experience/admin${pagination}${filter}` );
  }

  getInfoBase() {
    return this._callService.getQuery( 'experience/servicesGenerales' );
  }

  getExperiences( idPartner: number ) {
    return this._callService.getQuery( `experience/partner/${idPartner}` );
  }

  getExperience( idExperience: number ) {
    return this._callService.getQuery( `experience/${idExperience}/admin` );
  }

  changeStatus( idExperience: number ) {
    const body = {};
    return this._callService.putQuery( `experience/${ idExperience }/status` , body );
  }

  addStepOne( title: string , descriptionS: string , description: string , idCategory: number , idPartner: number , simultaneous: number , idType: number , price: number ) {
    const body = {
      name : title ,
      short_description : descriptionS ,
      description : description,
      id_category : idCategory,
      id_partner : idPartner ,
      simultaneous : simultaneous ,
      id_type_experience : idType ,
      price : price
    };
    return this._callService.postQuery( 'experience/stepone' , body );
  }

  editStepOne( idExperience: number , title: string , descriptionS: string , description: string , idCategory: number , idPartner: number , simultaneous: number , idType: number , price: number ) {
    const body = {
      name : title ,
      short_description : descriptionS ,
      description : description,
      id_category : idCategory,
      id_partner : idPartner ,
      simultaneous : simultaneous ,
      id_type_experience : idType ,
      price : price
    };
    return this._callService.putQuery( `experience/${idExperience}` , body );
  }

  editStepTwo( idExperience: number , idRegion: number , idProvincia: number , idComuna: number , direccion: string , indicaciones: string , latitud : string , longitud: string ) {
    const body = {
      id_country : 1,
      id_region : idRegion ,
      id_province : idProvincia ,
      id_commune : idComuna ,
      address : direccion,
      add_indications : indicaciones ,
      latitude : latitud ,
      longitude : longitud
    };
    return this._callService.putQuery( `experience/${idExperience}` , body );
  }

  editStepThree( idExperience: number , capacity: number , kids: boolean , babies: boolean , pets: number ) {
    const body = {
      capacity : capacity ,
      babies : babies ,
      pets : pets ,
      kids : kids
    };
    return this._callService.putQuery( `experience/${idExperience}` , body );
  }

  addService( idExperience: number , idService: number ) {
    const body = {
      id_experience : idExperience ,
      id_service_admin : idService
    };
    return this._callService.postQuery( 'experience/addserviceadmin' , body );
  }

  
  removeService( idExperience: number , idService: number ) {
    return this._callService.deleteQuery( `experience/${idExperience}/removeserviceadmin/${idService}` );
  }

  addSecurity( idExperience: number , idSecurity: number ) {
    const body = {
      id_experience : idExperience ,
      id_security : idSecurity
    };
    return this._callService.postQuery( 'experience/addsecurity' , body );
  }

  getBasePartnerCategory() {
    return this._callService.getQuery( `experience/servicesadmin` );
  }
  

  removeSecurity( idExperience: number , idSecurity: number ) {
    return this._callService.deleteQuery( `experience/${idExperience}/removesecurity/${idSecurity}` );
  }

  addFacility( idExperience: number , idFacility: number ) {
    const body = {
      id_experience : idExperience ,
      id_facilitie : idFacility
    };
    return this._callService.postQuery( 'experience/addfacilitie' , body );
  }

  removeFacility( idExperience: number , idFacility: number ) {
    return this._callService.deleteQuery( `experience/${idExperience}/removefacilitie/${idFacility}` );
  }

  addImage( idExperience: number , image: string ) {
    const body = {
      id_experience : idExperience ,
      image : image
    };
    return this._callService.postQuery( 'experience/addimage' , body );
  }

  addImageArray( idExperience: number , image: string , final: boolean , relation: any = '' ) {
    const body: any = {
      id_experience : idExperience ,
      part : image ,
      finally : final
    };
    if ( relation !== '' ) {
      body.relation = relation
    }
    return this._callService.postQuery( 'experience/addimagepart' , body );
  }

  removeImage( idExperience: number , idImage: number ) {
    return this._callService.deleteQuery( `experience/${idExperience}/removeimage/${idImage}` );
  }

  getInfoDates( idExperience: number ) {
    return this._callService.getQuery( `experience/${idExperience}/period` );
  }

  setDateAvailable( idExperience: number , dateIn: string , dateEnd: string ) {
    const body = {
      id_experience : idExperience ,
      available : true,
      date_begin : dateIn ,
      date_end : dateEnd
    };
    return this._callService.postQuery( `experience/addperiod` , body );
  }

  deleteDate( idExperience: number , idPeriod: number ) {
    return this._callService.deleteQuery( `experience/${idExperience}/period/${idPeriod}` );
  }

  addDateNotAvailable( idExperience: number , title: string , dateIn: string , dateEnd: string ) {
    const body = {
      id_experience : idExperience ,
      available : false ,
      date_begin : dateIn ,
      date_end : dateEnd ,
      name: title
    };
    return this._callService.postQuery( `experience/addperiod` , body );
  }

  deleteDatePrice( idExperience: number , idSpecialPrice: number ) {
    return this._callService.deleteQuery( `experience/${idExperience}/specialprice/${idSpecialPrice}` );
  }

  addDatePrice( idExperience: number , title: string , price: string ,  dateIn: string , dateEnd: string ) {
    const body = {
      id_experience : idExperience ,
      date_begin : dateIn ,
      date_end : dateEnd ,
      name: title ,
      price: price
    };
    return this._callService.postQuery( `experience/addspecialprice` , body );
  }




  getTotals() {
    return this._callService.getQuery( 'booking/data' );
  }

  getRegisters( pageSize: number , pageNum: number , filter: string ) {
    let pagination = `?page_size=${pageSize}&page_num=${pageNum}`;
    return this._callService.getQuery( `booking${pagination}${filter}` );
  }

  getStatesTrypo() {
    return this._callService.getQuery( 'statustrypo' );
  }

  changeStateTrypo( idBook: number , idState: number , reason = '' , code = '' , fecha = '' ) {
    const body = {
      reason : reason ,
      date_payment : fecha ,
      id_payment : code
    };
    return this._callService.putQuery( `booking/${idBook}/status/${idState}` , body );
  }
  

  getExcel( dateIn: any , dateOut: any) {
    return this._callService.getQuery( `booking/excel?date_begin=${dateIn}&date_end=${dateOut}` );
  }

  getAllPending( pageSize: number , pageNum: number , filter: string ) {
    let pagination = `?page_size=${pageSize}&page_num=${pageNum}`;
    return this._callService.getQuery( `experience/listapproval${pagination}${filter}` );
  }

  aproved( idApproval: number , state: boolean , reason = '' ) {
    const body = {
      reason : reason,
      approval : state
    };
    return this._callService.putQuery( `experience/approval/${idApproval}` , body );
  }

  changeOrderImage( idImage: number , order: number ) {
    const body = {
      order : order
    };
    return this._callService.putQuery( `/experience/${idImage}/changeorderimage` , body );
  }
}
