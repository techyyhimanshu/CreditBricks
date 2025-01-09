export interface Table{
    dataToPrint:Array<object>,
    url:string
}

interface Title{
    title:string[]
}

export interface Igetdata{
    url:string,
    pages:number,
    perPage:number,
    totalfilter?: {
        [key: string]: string | string[]; // Adjust based on possible filter types
    };
    filter:any,
    sortBy?:string,
    order?:string,
    userId?:string
}

export interface Igetsearched extends Igetdata{
    search:string
}

export interface Icheckdata{
    data:object[],
    filtereddata:object[],
    url:string
}

export interface IDataTableBase{
    coloumn:Array<object>,
    url:string,
    url:string,
    getdata:(arg:T)=>void,
    filter:object,
    theme:boolean
}

export interface Props{
    pages:number;
    totalRows:number;
    perPage:number;
    changingpage:any
}

export interface ReactTableProps {
    columns: any,
    url: string,
    filter: object,
    url: string,
    getdata:(arg:Array<object>)=>void,
}

export interface RealEstateProjectData {
    title: string;
    status: string;
    min_investment: string;
    closing_date: string;
    security_type: string;
    pitch_deck: string;
    irr: string;
    equity_multiple: string;
    estimated_exit_date: string;
    investor_status: string;
    photos: string;
    capital_raise: string;
  }
  
  export interface RealEstateData {
    description: string;
    address_1: string;
    address_2: string;
    zipcode: string;
    city: string;
    state: string;
    country: string;
    name: string;
    property_type: string;
    video_url: string;
    property_class: string;
    year_built: string;
    units: string;
    legal_entity_id: string;
  }
  
  export interface StartupProjectData {
    title: string;
    status: string;
    min_investment: string;
    closing_date: string;
    security_type: string;
    pitch_deck: string;
    capital_raise: string;
    investment_terms: string;
  }
  
  export interface StartupData {
    legal_entity_id: string;
    domain: string;
    description: string;
    logo?: string;
    image?: string;
    website: string;
    funding_stage: string;
    arr: string;
    valuation: string;
    video: string;
    incorporation_date: string;
  }
  
  export interface LegalData {
    name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    emailId: string;
    phone_number: string;
  }
  
  export interface UsersData {
    first_name: string;
    last_name: string;
    email_id: string;
    phone_number: string;
  }
  
  export interface DocumentData {
    title: string;
    description: string;
    s3_id: string;
    type_id: number;
  }
  
  export interface Details {
    startupProjectData?: StartupProjectData;
    realestateProjectData?: RealEstateProjectData;
    startupData?: StartupData;
    realestateData?: RealEstateData;
    legalData: LegalData;
    usersData: UsersData;
    documentData: DocumentData;
  }
  