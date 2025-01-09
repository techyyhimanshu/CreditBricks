

import { imagesData } from "./commonimages";

// Cardsdata

interface card1 {
  class: string
  text: string
}

export const cardsdata1: card1[] = [
  { class: '', text: '  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form' },
  { class: 'bg-primary  text-white', text: '  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form' },
  { class: 'bg-danger text-white', text: '  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form' }
];

interface card2 {
  class: string
  title: string
  text: string
}

export const cardsdata2: card2[] = [
  { title: 'Card title', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', class: '' },
  { title: 'Card title', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', class: 'primary' },
  { title: 'Card title', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', class: 'secondary' },
  { title: 'Card title', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', class: 'success' },
  { title: 'Card title', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', class: 'warning' },
  { title: 'Card title', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', class: 'info' }
];

interface card3 {
  bg: string
  title: string
  subtitle: string
  text: string
  footer1: string
  footer2: string
  textcolor: string
  textcolor2: string
  class: string
  color: string
}
export const cardsdata3: card3[] = [
  { bg: 'card', title: 'Card title', subtitle: 'Card subtitle', text: ' At vero ducimus qui blanditiis leniti atque coret quas molestias excepturi sint similique sunt in culpa qui officia deserunt mollitia.', footer1: 'Card link', footer2: 'Another link', class: '', textcolor: 'muted', color: 'secondary', textcolor2: '' },
  { bg: 'card', title: 'Card title', subtitle: 'Card subtitle', text: ' At vero ducimus qui blanditiis leniti atque coret quas molestias excepturi sint similique sunt in culpa qui officia deserunt mollitia.', footer1: 'Card link', footer2: 'Another link', class: 'card-title', textcolor: 'muted', color: 'secondary', textcolor2: '' },
  { bg: 'bg-info', title: 'Card title', subtitle: 'Card subtitle', text: ' At vero ducimus qui blanditiis leniti atque coret quas molestias excepturi sint similique sunt in culpa qui officia deserunt mollitia.', footer1: 'Card link', footer2: 'Another link', class: 'card-title card-title3 text-white', textcolor: 'white', color: 'white', textcolor2: 'white' }
];

interface card4 {
  src: string
  text: string
  class: string

}
export const cardsdata4: card4[] = [
  { src: imagesData('photo14'), text: ' Some quick example text to build on the card title and make up the bulk of the card s content.', class: '' },
  { src: imagesData('photo12'), text: ' Some quick example text to build on the card title and make up the bulk of the card s content.', class: 'mg-md-t-0' },
  { src: imagesData('photo13'), text: ' Some quick example text to build on the card title and make up the bulk of the card s content.', class: 'mg-md-t-0' }
];

interface card5 {
  src: string
  text: string
  class: string

}
export const cardsdata5: card5[] = [
  { src: imagesData('photo1'), text: ' Some quick example text to build on the card title and make up the bulk of the card s content.', class: '' },
  { src: imagesData('photo2'), text: ' Some quick example text to build on the card title and make up the bulk of the card s content.', class: 'mg-md-t-0' },
  { src: imagesData('photo1'), text: ' Some quick example text to build on the card title and make up the bulk of the card s content.', class: 'mg-md-t-0' }
];

interface card6 {
  src: string
  title: string
  text: string
  class: string

}
export const cardsdata6: card6[] = [
  { src: imagesData('photo3'), title: " Description", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', class: '' },
  { src: imagesData('photo5'), title: "The Ghost Town", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', class: 'mg-md-t-0' },
  { src: imagesData('photo6'), title: "The Green Leaves", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', class: 'mg-md-t-0' },
  { src: imagesData('photo6'), title: "The Green Leaves", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', class: 'mg-md-t-0' }
];

interface card7 {

  title: string
  text: string
  class: string
  color: string
}

export const cardsdata7: card7[] = [
  { title: " Description", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', color: 'secondary', class: '' },
  { title: "Description", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', color: 'primary', class: 'mg-md-t-0' },
  { title: "Description", text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', color: 'gray-800', class: 'mg-md-t-0' }

];

interface card8 {
  text: string
  class: string
  color: string
}

export const cardsdata8: card8[] = [
  { text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', color: 'primary', class: '' },
  { text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', color: 'secondary', class: 'mg-md-t-0' },
  { text: '  Some quick example text to build on the card title and make up the bulk of the card s content. Lorem ipsum dolor sit amet consictetur...', color: 'success', class: 'mg-md-t-0' }
];

interface card9 {
  title: string
  text: string
  color: string
  src: string
}

export const cardsdata9: card9[] = [
  { src: imagesData('photo7'), title: 'Card Title', text: '  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', color: 'primary' },
  { src: imagesData('photo8'), title: 'Card Title', text: '  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', color: 'secondary' },
  { src: imagesData('photo9'), title: 'Card Title', text: '  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', color: 'success' }
];

interface card10 {
  title: string
  text: string
  class1: string
  class2: string
  src: string
}

export const cardsdata10: card10[] = [
  { src: imagesData('product3'), title: ' The Card Title', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', class1: 'Alica Nestle', class2: '15 mintues ago' },
  { src: imagesData('product4'), title: ' The Card Title', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', class1: 'Alica Nestle', class2: '15 mintues ago' }
];
//end Cardsdata

//Widgets Notifictaiondata

// 1) Data Not Found

interface widgets1 {
  title: string
  text: string
  class1: string
  class2: string
}

export const Widgetsdata1: widgets1[] = [
  { title: 'Data Not Found.', text: ' Click to view details', class1: 'danger' , class2:'close'},
  { title: 'Success Data', text: ' Click to view details', class1: 'success' , class2:'check'},
  { title: 'Warning Alert', text: ' Click to view details', class1: 'warning' , class2:'exclamation'},
  { title: 'Info Alert', text: ' Click to view details', class1: 'info' , class2:'info'}
];

// 2)Error Data

interface widgets2 {
  title: string
  text1: string
  text2: string
  class: string
  class1: string
}

export const Widgetsdata2: widgets2[] = [
  { title: 'Error Data', text1: 'Oh snap!', text2: ' Change a few things up and try submitting again.', class: 'danger', class1:'close' },
  { title: 'Success  Data', text1: 'Well done!', text2: ' You successfully read this important alert message.', class: 'success', class1:'check' },
  { title: 'warning Data', text1: 'Well done!', text2: ' You successfully read this important alert message.', class: 'warning', class1:'exclamation' },
  { title: 'info Data', text1: 'Heads up!', text2: ' This alert needs your attention, but it s not super important..', class: 'info' , class1:'info' }
];

// 3)Success

interface widgets3 {
  title: string
  text: string
  class: string
  class1: string
}

export const Widgetsdata3: widgets3[] = [
  { title: 'Success', text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.', class: 'success' , class1:'check'},
  { title: 'info', text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.', class: 'info' , class1:'info'},
  { title: 'Danger', text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.', class: 'danger' , class1:'close'},
  { title: 'Warning', text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.', class: 'warning' , class1:'exclamation'}
];

// 4)

interface widgets4 {
  title: string
  class1: string
  class2: string
  class: string
}

export const Widgetsdata4: widgets4[] = [
  { title: 'Data Not Found.', class1:'danger', class2: 'white', class:'close' },
  { title: 'Submitted Successfully', class1: 'success', class2: 'white', class:'check' },
  { title: 'Info Alert', class1:'info', class2: 'white', class:'info' },
  { title: 'Warning Alert', class1:'warning', class2: 'white', class:'exclamation' },
  { title: 'Data Not Found.', class1:'', class2: 'danger', class:'close' },
  { title: 'Submitted Successfully', class1: '', class2: 'success', class:'check' },
  { title: 'Info Alert', class1: '', class2: 'info', class:'info' },
  { title: 'Warning Alert', class1: '', class2: 'warning', class:'exclamation' }
];

// 5)
interface widgets5 {
  src: string
  title: string
  text: string
}

export const Widgetsdata5: widgets5[] = [
  { src: imagesData('nodata'), title: 'Items Not Found', text: 'Check The Settings' },
  { src: imagesData('note'), title: 'Its Empty In Here', text: 'Check The Settings' },
  { src: imagesData('imac'), title: 'No Site Selected', text: 'Check The Settings' }
];
// end Widgetsdata

// fileamanagerdata

interface filmanager1 {
  title: string
  icon: string
  key: string
}

export const Filmanagerdata1: filmanager1[] = [
  { title: 'Images', icon: 'image', key: 'Images' },
  { title: 'Music', icon: 'music', key: 'Music' },
  { title: 'Videos', icon: 'video', key: 'Videos' },
  { title: 'APKS', icon: 'smartphone', key: 'APKS' },
  { title: 'Downloads', icon: 'download', key: 'Downloads' },
  { title: 'Favourites', icon: 'heart', key: 'Favourites' },
  { title: 'Hidden FIles', icon: 'eye', key: 'Hidden' },
  { title: 'Transfer files', icon: 'share', key: 'Transfer' },
  { title: 'Google Drive', icon: 'database', key: 'Google' },
  { title: 'FTP', icon: 'airplay', key: 'FTP' },
  { title: 'Private FIles', icon: 'lock', key: 'Private' },
  { title: 'Deep Clean', icon: 'wind', key: 'Deep' },
  { title: 'More', icon: 'grid', key: 'More' }
];

const svg1 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
  <path fill="#fbb8c7" d="M18.12158,11.88672c-1.18039-1.14226-3.05327-1.14485-4.23681-0.00586l-1.58985,1.58008c-0.39155,0.38922-0.39343,1.02216-0.00421,1.41371c0.00043,0.00043,0.00085,0.00086,0.00128,0.00129l4.67481,4.68457L17.14148,20H19c1.65611-0.00181,2.99819-1.34389,3-3v-0.83008c-0.00009-0.26567-0.10585-0.52039-0.29395-0.708L18.12158,11.88672z" />
  <path fill="#f74f75" d="M5,20h14c0.355-0.00278,0.70662-0.06923,1.03815-0.19617l-9.91657-9.91711C8.94094,8.74376,7.06706,8.74161,5.88379,9.88184L2.294,13.46191c-0.18812,0.1876-0.2939,0.44232-0.294,0.708V17C2.00181,18.65611,3.34389,19.99819,5,20z" />
  <path fill="#fa95ac" d="M19,4H5C3.34387,4.00183,2.00183,5.34387,2,7v7.16992c0.00012-0.26569,0.1059-0.52039,0.29401-0.70801l3.58978-3.58008c1.18329-1.14026,3.05713-1.13806,4.23779,0.00488l2.87585,2.87604l0.88733-0.8819c1.18353-1.13898,3.05646-1.13641,4.23682,0.00586l3.58447,3.5752c0.18811,0.18762,0.29388,0.44232,0.29395,0.70801V7C21.99817,5.34387,20.65613,4.00183,19,4z" />
</svg>;
const svg2 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
  <path fill="#94daf6" d="M14,18H5c-1.65611-0.00181-2.99819-1.34389-3-3V9c0.00181-1.65611,1.34389-2.99819,3-3h9c1.65611,0.00181,2.99819,1.34389,3,3v6C16.99819,16.65611,15.65611,17.99819,14,18z" />
  <path fill="#4ec2f0" d="M21.89465,7.55359c-0.24683-0.49432-0.8476-0.69495-1.34192-0.44812l-3.56421,1.7821C16.98999,8.92572,16.99994,8.96149,17,9v6c-0.00006,0.03851-0.01001,0.07428-0.01147,0.11243l3.56421,1.7821C20.69165,16.96381,20.84479,16.99994,21,17c0.55212-0.00037,0.99969-0.44788,1-1V8C21.99994,7.84503,21.96387,7.6922,21.89465,7.55359z" />
</svg>;
const svg3 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#ffd79c" d="M20,9,13,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3Z" />
  <path fill="#ffbd5a" d="M20 9H15a2 2 0 0 1-2-2V2zM12 18.00031a.99943.99943 0 0 1-1-1v-2a1 1 0 1 1 2 0v2A.99943.99943 0 0 1 12 18.00031zM12 13.00031a.8444.8444 0 0 1-.37988-.08008 1.02883 1.02883 0 0 1-.33008-.21.98946.98946 0 0 1-.29-.71 1.02776 1.02776 0 0 1 .29-.71 1.60941 1.60941 0 0 1 .14941-.12012.74157.74157 0 0 1 .18067-.08984.61981.61981 0 0 1 .17968-.06055.95515.95515 0 0 1 .58008.06055 1.16023 1.16023 0 0 1 .33008.21 1.0321 1.0321 0 0 1 .29.71.99349.99349 0 0 1-.29.71A1.01024 1.01024 0 0 1 12 13.00031z" />
</svg>;
const svg4 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#f34343" d="M21.65137,2.24121a1.00561,1.00561,0,0,0-.80323-.22949l-13,2A1.00054,1.00054,0,0,0,7,5V15.35107A3.45946,3.45946,0,0,0,5.5,15,3.5,3.5,0,1,0,9,18.5V10.85779L20,9.16553v4.18554A3.45946,3.45946,0,0,0,18.5,13,3.5,3.5,0,1,0,22,16.5V3A.99909.99909,0,0,0,21.65137,2.24121Z" />
</svg>;

const svg5 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
  <path fill="#aca7fb" d="M21.2,6.21l-7.58,7.58c-1.16755,1.17084-3.06319,1.17351-4.23404,0.00596C9.38397,13.79398,9.38198,13.79199,9.38,13.79L1.8,6.21C2.29464,5.16676,3.34544,4.50126,4.5,4.5h14C19.65456,4.50126,20.70536,5.16676,21.2,6.21z" />
  <path fill="#c8c4fc" d="M21.20001,6.21002L13.62,13.78998c-1.16754,1.17084-3.06317,1.17352-4.23401,0.00598C9.38397,13.79401,9.38196,13.79199,9.38,13.78998L1.79999,6.21002C1.60345,6.61169,1.50085,7.0528,1.5,7.5v10c0.00488,1.65485,1.34515,2.99512,3,3h14c1.65485-0.00488,2.99512-1.34515,3-3v-10C21.49915,7.0528,21.39655,6.61169,21.20001,6.21002z" />
  <path fill="#766df9" d="M17.5,9.5c-0.26527,0.0003-0.51971-0.10515-0.707-0.293l-2-2c-0.38694-0.39399-0.38123-1.02706,0.01276-1.414c0.38897-0.38202,1.01227-0.38202,1.40125,0L17.5,7.086l3.293-3.293c0.39399-0.38694,1.02706-0.38122,1.414,0.01277c0.38201,0.38897,0.38201,1.01226,0,1.40123l-4,4C18.01971,9.39485,17.76527,9.5003,17.5,9.5z" />
</svg>;
const svg6 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
  <path fill="#75c3b6" d="M20,9,13,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3Z" />
  <path fill="#1a9c86" d="M20 9H15a2 2 0 0 1-2-2V2zM12 18.00031a.99943.99943 0 0 1-1-1v-5a1 1 0 1 1 2 0v5A.99943.99943 0 0 1 12 18.00031z" />
  <path fill="#1a9c86" d="M12,18.00031a.99676.99676,0,0,1-.707-.293l-2-2A.99989.99989,0,1,1,10.707,14.29328L12,15.58625l1.293-1.293A.99989.99989,0,1,1,14.707,15.70734l-2,2A.99676.99676,0,0,1,12,18.00031Z" />
</svg>;

const svg7 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#fdb172" d="M12.00011,22h-9a.99991.99991,0,0,1-.707-1.707L4.257,18.3291A10.00061,10.00061,0,1,1,12.00011,22Z" />
  <path fill="#fd7e14" d="M12,16.24219a.99676.99676,0,0,1-.707-.293L8.46484,13.12109a3.00244,3.00244,0,0,1,0-4.24218A3.06772,3.06772,0,0,1,12,8.35254a3.0699,3.0699,0,0,1,3.53613.52637,3.00332,3.00332,0,0,1-.001,4.24218L12.707,15.94922A.99676.99676,0,0,1,12,16.24219Z" />
</svg>;
const svg8 = <svg className="file-manager-icon me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect width="9" height="9" x="2" y="2" fill="#f74f75" rx="1" />
  <rect width="9" height="9" x="2" y="13" fill="#fa95ac" rx="1" />
  <rect width="9" height="9" x="13" y="2" fill="#fa95ac" rx="1" />
  <rect width="9" height="9" x="13" y="13" fill="#fa95ac" rx="1" />
</svg>;

// 2)
interface filmanager2 {
  svg: JSX.Element
  title: string
  text: string
}

export const Filmanagerdata2: filmanager2[] = [
  { svg: svg1, title: 'Image', text: '14.2 mb' },
  { svg: svg2, title: 'Video', text: '212 mb' },
  { svg: svg3, title: 'Docs', text: '34 mb' },
  { svg: svg4, title: 'Music', text: '1.5 gb' },
  { svg: svg5, title: 'APK', text: '550 mb' },
  { svg: svg6, title: 'Downloads', text: '10.8 mb' },
  { svg: svg7, title: 'Chat', text: '1.5 Gb' },
  { svg: svg8, title: 'More', text: '16 Gb' }

];

// 3)
interface filmanager3 {
  src: string
  title: string
  text: string
}

export const Filmanagerdata3: filmanager3[] = [
  { src: imagesData('folder'), title: 'videos', text: '4.23gb' },
  { src: imagesData('folder'), title: 'Images', text: '1.23gb' },
  { src: imagesData('image'), title: 'Sea', text: '8.97mb' },
  { src: imagesData('folder'), title: 'Downloads', text: '453kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('word'), title: 'Word document', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('image'), title: 'Outdoor Image', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('folder'), title: 'Downloads', text: '453kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' }
];

// end fileamanagerdata

// start fileamanager1data
interface filmanagerdata1 {
  src: string
  title: string
  text: string
}

export const Filmanager1data: filmanagerdata1[] = [
  { src: imagesData('folder'), title: 'videos', text: '4.23gb' },
  { src: imagesData('folder'), title: 'Images', text: '1.23gb' },
  { src: imagesData('folder'), title: 'Downloads', text: '453kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('word'), title: 'Word document', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('folder'), title: 'Downloads', text: '453kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('file'), title: 'document.pdf', text: '23kb' },
  { src: imagesData('folder'), title: 'Downloads', text: '453kb' },
  { src: imagesData('doc'), title: 'Document', text: '23kb' },
  { src: imagesData('image'), title: 'login image', text: '23kb' },
  { src: imagesData('image'), title: 'beach image', text: '4.23gb' },
  { src: imagesData('image'), title: 'sky image', text: '1.23gb' },
  { src: imagesData('image'), title: 'sear image', text: '897mb' },
  { src: imagesData('image'), title: 'Outdoor image', text: '23kb' }
];

// end fileamanager1data

//fileattachment

// FILE ATTACHMENT TAGS

interface fileattachment {
id:number
color:string
}

export const Fileattachmentdata: fileattachment[] = [
  {id:1, color:'primary'},
  {id:2, color:'secondary'},
  {id:3, color:'primary'},
  {id:4, color:'warning'},
  {id:5, color:'danger'},
  {id:6, color:'info'},
];

//pages/profiledata

interface profiledata {
  src: string
  title: string
  text: string
}

export const Friendsdata: profiledata[] = [
  { src: imagesData('female1'), title: 'James Thomas', text: 'Web designer' },
  { src: imagesData('female3'), title: 'Reynante Labares', text: 'Web designer' },
  { src: imagesData('female4'), title: 'Owen Bongcaras', text: 'Web designer' },
  { src: imagesData('female8'), title: 'Stephen Metcalfe', text: 'Administrator' },
  { src: imagesData('female2'), title: 'Socrates Itumay', text: 'Web designer' },
  { src: imagesData('female3'), title: 'Reynante Labares', text: 'Project Manager' },
  { src: imagesData('female4'), title: 'Owen Bongcaras', text: 'App Developer' },
  { src: imagesData('female8'), title: 'Stephen Metcalfe', text: 'Administrator' }
];

//end pages/profiledata

//pages/aboutus

const icon1 = <svg className="about-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#38cab3" d="M10.3125,16.09375a.99676.99676,0,0,1-.707-.293L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328l-6.1875,6.1875A.99676.99676,0,0,1,10.3125,16.09375Z" opacity=".99" />
  <path fill="#87dfd1" d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm5.207,7.61328-6.1875,6.1875a.99963.99963,0,0,1-1.41406,0L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328Z" />
</svg>;
const icon2 = <svg className="about-icons" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><circle cx="10" cy="8.5" r="5" fill="#fbb8c7" />
  <path fill="#fa95ac" d="M13.30884,12.22253C12.42566,13.00806,11.27496,13.5,10,13.5s-2.42566-0.49194-3.30884-1.27747C3.92603,13.48206,2,16.26324,2,19.5c0,0.00018,0,0.00037,0,0.00055C2.00012,20.05267,2.44788,20.50012,3,20.5h14c0.00018,0,0.00037,0,0.00055,0c0.55212-0.00012,0.99957-0.44788,0.99945-1C18,16.26324,16.07397,13.48206,13.30884,12.22253z" />
  <path fill="#f74f75" d="M18.3335,13.5c-0.26526,0.0003-0.51971-0.10515-0.707-0.293l-1.3335-1.333c-0.38694-0.39399-0.38123-1.02706,0.01275-1.414c0.38897-0.38202,1.01228-0.38202,1.40125,0l0.62647,0.626l1.95953-1.96c0.39399-0.38694,1.02706-0.38123,1.414,0.01275c0.38202,0.38897,0.38202,1.01227,0,1.40125l-2.6665,2.667C18.85321,13.39485,18.59877,13.5003,18.3335,13.5z" />
</svg>;

const icon3 = <svg className="about-icons" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
  <path fill="#ffd79c" d="M12,14.5c-3.26461,0.00094-6.4876-0.73267-9.43018-2.14648C2.22156,12.18802,1.99974,11.83676,2,11.45117V9.5c0.00181-1.65611,1.34389-2.99819,3-3h14c1.65611,0.00181,2.99819,1.34389,3,3v1.95215c0.00003,0.3859-0.22189,0.73741-0.57031,0.90332C18.48677,13.76762,15.26418,14.50051,12,14.5z M21,11.45215L21,11.45215z" />
  <path fill="#ffbd5a" d="M10,6.5v-1c0.00055-0.55206,0.44794-0.99945,1-1h2c0.55206,0.00055,0.99945,0.44794,1,1v1h2v-1c-0.00183-1.65613-1.34387-2.99817-3-3h-2c-1.65613,0.00183-2.99817,1.34387-3,3v1H10z" />
  <path fill="#ffe4bd" d="M21.42969,12.35547C18.48676,13.76764,15.26416,14.50049,12,14.5c-3.26459,0.00092-6.48761-0.73267-9.43018-2.14648C2.22156,12.18805,1.99976,11.83673,2,11.45117V18.5c0.00183,1.65613,1.34387,2.99817,3,3h14c1.65613-0.00183,2.99817-1.34387,3-3v-7.04785C22.00006,11.83807,21.77814,12.18958,21.42969,12.35547z" />
  <path fill="#ffbd5a" d="M8,15.5c-0.55214,0.00014-0.99986-0.44734-1-0.99948C7,14.50035,7,14.50017,7,14.5v-2c0-0.55229,0.44772-1,1-1s1,0.44771,1,1v2c0.00014,0.55214-0.44734,0.99986-0.99948,1C8.00035,15.5,8.00017,15.5,8,15.5z M16,15.5c-0.55214,0.00014-0.99986-0.44734-1-0.99948c0-0.00017,0-0.00035,0-0.00052v-2c0-0.55229,0.44771-1,1-1c0.55228,0,1,0.44771,1,1v2c0.00014,0.55214-0.44734,0.99986-0.99948,1C16.00035,15.5,16.00017,15.5,16,15.5z" />
</svg>;
const icon4 = <svg className="about-icons" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><circle cx="12" cy="9.25" r="6" fill="#b8e6f9" />
  <path fill="#94daf6" d="M19.57391,17.01288L17.00854,12.56l-0.00873,0.00433C15.92511,14.18231,14.08795,15.25,12,15.25c-0.1286,0-0.25439-0.01123-0.38098-0.01923l0.38953,0.66925l2.37408,4.11218c0.13806,0.23914,0.44385,0.32111,0.68304,0.18304c0.07391-0.04266,0.13562-0.10358,0.17938-0.17682l1.32349-2.21844l2.57941-0.0376c0.27612-0.00397,0.4967-0.23108,0.49268-0.5072C19.6394,17.17004,19.61646,17.08667,19.57391,17.01288z" />
  <path fill="#4ec2f0" d="M11.61896,15.23071c-1.92963-0.12152-3.61176-1.14911-4.62012-2.66864l-2.56421,4.45081c-0.04248,0.07379-0.06549,0.15717-0.06671,0.24231c-0.00397,0.27612,0.21661,0.50323,0.49274,0.5072L7.44,17.79999l1.32355,2.21844c0.0437,0.07324,0.10547,0.13416,0.17938,0.17682c0.23914,0.13806,0.54492,0.05609,0.68298-0.18304L12,15.90002l0.00427-0.00732l-0.38525-0.66193L11.61896,15.23071z" />
</svg>;

interface about1 {
  svg: JSX.Element
  title: string
  text1: number
  text2: string
  class: string
}

export const Aboutusdata1: about1[] = [
  { svg: icon1, title: 'James Thomas', text1: 256, text2: 'Completed Projects', class: 'primary' },
  { svg: icon2, title: 'Reynante Labares', text1: 7234, text2: 'Total Customers', class: 'secondary' },
  { svg: icon3, title: 'Owen Bongcaras', text1: 846, text2: 'Available Employeed', class: 'warning' },
  { svg: icon4, title: 'Stephen Metcalfe', text1: 153, text2: 'Awards won', class: 'info' }
];
// 2)
interface about2 {
  src: string
  name: string
  role: string
  text: string

}

export const Aboutusdata2: about2[] = [
  { src: imagesData('female1'), name: 'Rosen Berg', role: 'Chief Manager', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam similique provident !' },
  { src: imagesData('female2'), name: 'Mclaren mcannen', role: 'Sales Manager', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam similique provident !' },
  { src: imagesData('female3'), name: 'Shimpa Craig', role: 'Author & writer', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam similique provident !' },
  { src: imagesData('female4'), name: 'Limo Peter', role: 'Operations Head', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam similique provident !' }
];
//end pages/aboutus

//pages/mail/mail
interface mail1 {
  class1: string
  class2: string
  src: string
  name: string
  text1: string
  text2: string
  text3: string
  text4: string

}

export const maildata1: mail1[] = [
  { class1: '', class2: 'main-img-user', src: imagesData('female5'), name: 'Adrian Monino', text1: 'Someone who believes in you', text2: 'enean commodo li gula eget dolor cum socia eget dolor enean commodo li gula eget dolor cum socia eget dolor', text3: '11:30am', text4: '' },
  { class1: 'active', class2: 'main-img-user', src: imagesData('female2'), name: 'Albert Ansing', text1: 'Here s What You Missed This Week', text2: 'enean commodo li gula eget dolor cum socia eget dolor enean commodo li gula eget dolor cum socia eget dolor', text3: '06:50am', text4: '' },
  { class1: '', class2: 'main-img-user', src: imagesData('female9'), name: 'Carla Guden', text1: '4 Ways to Optimize Your Search', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Yesterday', text4: '' },
  { class1: '', class2: 'main-img-user', src: imagesData('female10'), name: 'Reven Galeon', text1: 'We re Giving a Macbook for Free', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Yesterday', text4: '' },
  { class1: '', class2: 'main-img-user', src: imagesData('female12'), name: 'Elisse Tan', text1: 'Keep Your Personal Data Safe', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 13', text4: '' },
  { class1: '', class2: 'main-img-user', src: imagesData('female3'), name: 'Marianne Audrey', text1: 'We ve Made Some Changes', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 13', text4: '' },
  { class1: '', class2: 'main-avatar bg-gray-800', src: '', name: 'Jane Phoebe', text1: 'Grab Our Holiday Deals', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 12', text4: 'j' },
  { class1: '', class2: 'main-img-user', src: imagesData('female15'), name: 'Raffy Godinez', text1: 'Just a Few Steps Away', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 5', text4: '' },
  { class1: 'active', class2: 'main-img-user', src: imagesData('female7'), name: 'Allan Cadungog', text1: 'Credit Card Promos', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 4', text4: '' },
  { class1: '', class2: 'main-img-user', src: imagesData('female10'), name: 'Alfie Salinas', text1: '4 Ways to Optimize Your Search', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 2', text4: '' },
  { class1: '', class2: 'main-img-user', src: imagesData('female1'), name: 'Jove Guden', text1: 'Keep Your Personal Data Safe', text2: 'viva mus elemen tum semper nisi enean vulputat enean commodo li gula eget dolor cum socia eget dolor !', text3: 'Oct 2', text4: '' }
];

////pages/mail/mailcompose,  readmail data and mailsettings
interface mailcompose {
  icon: string
  text1: string
  text2: string
  key: string
}

export const Mailcomposedata: mailcompose[] = [
  { icon: 'far fa-envelope', text1: 'Inbox', text2: '18', key: 'Inbox' },
  { icon: 'far fa-star', text1: 'Starred', text2: '8', key: 'Starred' },
  { icon: 'far fa-clock', text1: 'Snoozed', text2: '6', key: 'Snoozed' },
  { icon: 'far fa-bookmark', text1: 'Important', text2: '15', key: 'Important' },
  { icon: 'far fa-paper-plane', text1: 'Sent Mail', text2: '24', key: 'Sent' },
  { icon: 'far fa-hourglass', text1: 'Drafts', text2: '2', key: 'Drafts' },
  { icon: 'far fa-dot-circle', text1: 'Spam', text2: '32', key: 'Spam' },
  { icon: 'far fa-comments', text1: 'Chats', text2: '14', key: 'Chats' },
  { icon: 'far fa-user-circle', text1: 'Contacts', text2: '547', key: 'Contacts' },
  { icon: 'fe fe-trash', text1: 'Trash', text2: '365', key: 'Trash' }
];
//end

//pages/pricing

// 1)
interface pricing1 {
  type: string
  most: string
  price: string
  free: string
  click: string
  data: string
}

export const Basicdata: pricing1[] = [
  {
    type: "Basic",
    most: '',
    price: "0",
    free: "2 Free",
    click: "3",
    data: "1",
  },
  {
    type: "Advanced",
    most: "Most Popular",
    price: "1,299",
    free: "5 Free",
    click: "5",
    data: "3",
  },
  {
    type: "Regular",
    most: '',
    price: "79.9",
    free: "1 Free",
    click: "4",
    data: "2",
  },
  {
    type: "Premium",
    most: '',
    price: "579.9",
    free: " 1 Free",
    click: "5",
    data: "3",
  },
];

// 2)
interface pricing2 {
  type: string
  price: string
  free: string
  textcolor: string
  storage: string
  className: string
  tb: string
  text: string
  textprice: string
  click: string
  data: string
  pricecolor: string
  daly: string
  online: string
  Email: string
  check: string
  checks: string
  checkemail: string
  color: string
  most: string
}

export const Business: pricing2[] = [
  {
    type: "Business",
    color: "primary",
    price: "0",
    free: "2 Free",
    textcolor: "ms-3 tx-14 my-auto",
    storage: "$12",
    className: "d-flex align-items-center p-2 br-5 border",
    tb: "1Tb",
    text: "For Basic Business purpose !",
    textprice: "Best price is $29",
    most: "New",
    click: "3",
    data: "1",
    pricecolor: "ms-auto text-dark",
    daly: "$9",
    online: "24/7",
    Email: "$10",
    check: "true",
    checks: "",
    checkemail: "",
  },
  {
    type: "Advanced",
    color: "primary",
    tb: "5Tb",
    storage: "$140",
    textcolor: "ms-3 tx-14 my-auto text-primary",
    className:
      "d-flex align-items-center p-2 br-5 bg-primary-transparent border border-primary",
    text: " For Advanced business purpose !",
    textprice: "Best price is $599",
    most: "",
    price: "1,299",
    free: "5 Free",
    click: "5",
    data: "3",
    pricecolor: "ms-auto text-primary",
    daly: "$100",
    online: "$245",
    Email: "$154",
    check: "true",
    checks: "true",
    checkemail: "true",
  },
  {
    type: "Regular",
    color: "",
    price: "79.9",
    tb: "2Tb",
    storage: "$29",
    textcolor: "ms-3 tx-14 my-auto",
    className: "d-flex align-items-center p-2 br-5 border",
    free: "1 Free",
    text: "For Regular business purpose !",
    textprice: "Best price is $79",
    most: "",
    click: "4",
    data: "2",
    pricecolor: "ms-auto text-dark",
    daly: "$10",
    online: "$30",
    Email: "$10",
    check: "true",
    checks: "",
    checkemail: "true",
  },
  {
    type: "Premium",
    color: "",
    price: "579.9",
    free: " 1 Free",
    className: "d-flex align-items-center p-2 br-5 border",
    tb: "3Tb",
    storage: "$59",
    textcolor: "ms-3 tx-14 my-auto",
    text: "For Premium business purpose !",
    textprice: "Best price is $129",
    most: "",
    click: "5",
    data: "3",
    pricecolor: "ms-auto text-dark",
    daly: "$20",
    online: "$40",
    Email: "$20",
    check: "true",
    checks: "",
    checkemail: "true",
  },
];

// 3)
interface pricing3 {
  type: string
  yearprice: string
  Monthprice: string
  free: string
  click: string
  database: string
  most: string
}
export const Monthdata: pricing3[] = [
  {
    type: "Basic",
    most: '',
    yearprice: "0",
    Monthprice: "0",
    free: "2 Free",
    click: "3",
    database: "1",
  },
  {
    type: "Advanced",
    most: "Most Popular",
    Monthprice: "129",
    yearprice: "1,299",
    free: "5 Free",
    click: "5",
    database: "3",
  },
  {
    type: "Regular",
    most: '',
    yearprice: "699",
    Monthprice: "79",
    free: "1 Free",
    click: "4",
    database: "2",
  },
  {
    type: "Premium",
    most: '',
    yearprice: "899",
    Monthprice: "59",
    free: "1 Free",
    click: "5",
    database: "3",
  },
];
//end pages/pricing

//pages/todotask

interface Usertodaytasks {
  id: number
  time: string
  bgtext: string
  bg: string
  text: string
  text2: string
  img: string
  num: string
  bgcolor: string
  color: string
}

export const Tododata: Usertodaytasks[] = [
  {
    id: 1,
    time: "10:54am",
    bgtext: "New",
    bg: "primary-transparent",
    text: "Work Assigned by Clients ,try to get new work",
    text2: "Sed ut perspiciatis unde omnis iste natus",
    img: imagesData('female1'),
    num: "9",
    bgcolor: "primary",
    color: "primary",
  },
  {
    id: 2,
    time: "10:54am",
    bgtext: "completed",
    bg: "primary-transparent",
    text: "voluptatem accusantium dolo laudantium",
    text2: "inventore veritatis et quasi architecto",
    img: imagesData('female12'),
    num: "2",
    bgcolor: "primary",
    color: "info",
  },
  {
    id: 3,
    time: "10:54am",
    bgtext: "Pending ",
    bg: "danger-transparent",
    text: "Nemo enim ipsam voluptatem quia voluptas",
    text2: "vero eos et accusamus et iusto odio dignissimos",
    img: imagesData('female9'),
    num: "9",
    bgcolor: "danger",
    color: "danger",
  },
  {
    id: 4,
    time: "10:54am",
    bgtext: "completed",
    bg: "primary-transparent",
    text: "Ut enim ad minima veniam nostrum exercitationem",
    text2: "Quis autem vel eum iure reprehenderit qui",
    img: imagesData('female4'),
    num: "6",
    bgcolor: "primary",
    color: "info",
  },
  {
    id: 5,
    time: "10:54am",
    bgtext: "Pending ",
    bg: "danger-transparent",
    text: "I must explain to you how all this mistaken",
    text2: "I will give you a complete account of the system",
    img: imagesData('female15'),
    num: "7",
    bgcolor: "danger",
    color: "danger",
  },
  {
    id: 6,
    time: "10:54am",
    bgtext: "New",
    bg: "primary-transparent",
    text: "Rationally encounter quences extremely painful",
    text2: "Which of us ever undertakes laborious physical",
    img: imagesData('female5'),
    num: "4",
    bgcolor: "primary",
    color: "info",
  },
];
// endpages/todotask

//Utilities

// 1)GRAYSET

interface Grayset {
  text: string
  class1: string
  color: string
}

export const Graysetdata: Grayset[] = [
  { text: 'bg-gray-100', class1: '100', color: '' },
  { text: 'bg-gray-200', class1: '200', color: '' },
  { text: 'bg-gray-300', class1: '300', color: '' },
  { text: 'bg-gray-400', class1: '400', color: '' },
  { text: 'bg-gray-500', class1: '500', color: '' },
  { text: 'bg-gray-600', class1: '600', color: '' },
  { text: 'bg-gray-700', class1: '700', color: 'white-7' },
  { text: 'bg-gray-800', class1: '800', color: 'white-7' },
  { text: 'bg-gray-900', class1: '900', color: 'white-7  br5' }
];

// 2)SOLID BACKGROUND SET

interface Solidset {
  text: string
  class: string

}

export const Solidbackgroundsetdata: Solidset[] = [
  { text: '.bg-primary', class: 'primary' },
  { text: '.bg-secondary', class: 'secondary' },
  { text: '.bg-success', class: 'success' },
  { text: '.bg-warning', class: 'warning' },
  { text: '.bg-danger', class: 'danger' },
  { text: '.bg-info', class: 'info' },
  { text: '.bg-indigo', class: 'indigo' },
  { text: '.bg-purple', class: 'purple' },
  { text: '.bg-pink', class: 'pink' },
  { text: '.bg-teal', class: 'teal' },
  { text: '.bg-orange', class: 'orange' }
];

// 3) Solid Gradient Background Set

interface Solidgradient {
  text: string
  class: string

}

export const Solidgradientdata: Solidgradient[] = [
  { text: '.bg-primary-gradient', class: 'primary' },
  { text: '.bg-secondary-gradient', class: 'secondary' },
  { text: '.bg-success-gradient', class: 'success' },
  { text: '.bg-warning-gradient', class: 'warning' },
  { text: '.bg-danger-gradient', class: 'danger' },
  { text: '.bg-info-gradient', class: 'info' },
  { text: '.bg-purple-gradient', class: 'purple' },
  { text: '.bg-pink-gradient', class: 'pink' },
  { text: '.bg-teal-gradient', class: 'teal' }

];

// 4) TRANSPARENT WHITE SET and TRANSPARENT BLACK SET

interface Transparentwhiteset {
  src: string
  class1: string
  class2: string

}

export const Transparentwhitesetdata: Transparentwhiteset[] = [

  { src: imagesData('photo5'), class1: 'br-ts-5 br-bs-5', class2: '' },
  { src: imagesData('photo5'), class1: '', class2: '1' },
  { src: imagesData('photo5'), class1: '', class2: '2' },
  { src: imagesData('photo5'), class1: '', class2: '3' },
  { src: imagesData('photo5'), class1: '', class2: '4' },
  { src: imagesData('photo5'), class1: '', class2: '5' },
  { src: imagesData('photo5'), class1: '', class2: '6' },
  { src: imagesData('photo5'), class1: '', class2: '7' },
  { src: imagesData('photo5'), class1: '', class2: '8' }
];

//end Utilities/background/

// Utilities/display

interface hidingelements {
  code: string
  text: string

}

export const Hidingelementsdata: hidingelements[] = [

  { code: '.d-none', text: 'Hidden on all' },
  { code: '.d-none .d-sm-block', text: 'Hidden only on xs' },
  { code: '.d-sm-none .d-md-block', text: 'Hidden only on sm' },
  { code: '.d-md-none .d-lg-block', text: 'Hidden only on md' },
  { code: '.d-lg-none .d-xl-block', text: 'Hidden only on lg' },
  { code: '.d-xl-none', text: '	Hidden only on xl' },
  { code: '.d-xxl-none', text: 'Hidden only on xxl' },
  { code: '.d-block', text: 'Visible on all' },
  { code: '.d-block .d-sm-none', text: 'Visible only on xs' },
  { code: '.d-none .d-sm-block .d-md-none', text: 'Visible only on sm' },
  { code: '.d-none .d-md-block .d-lg-none', text: 'Visible only on md' },
  { code: '.d-none .d-lg-block .d-xl-none', text: 'Visible only on lg' },
  { code: '.d-none .d-xl-block', text: 'Visible only on xl' },
  { code: '.d-none .d-xxl-block', text: 'Visible only on xxl' }
];
//end Utilities/display

//utilities/extras/

interface Opacity {
  text1: string
  text2: string
  class: string
}

export const Opacitydata: Opacity[] = [
  { text1: '.op-1', text2: '', class: '1' },
  { text1: '', text2: '.op-2', class: '2' },
  { text1: '', text2: '.op-3', class: '3' },
  { text1: '', text2: '.op-4', class: '4' },
  { text1: '', text2: '.op-5', class: '5' },
  { text1: '', text2: '.op-6', class: '6' },
  { text1: '', text2: '.op-7', class: '7' },
  { text1: '', text2: '.op-8', class: '8' },
  { text1: '', text2: '.op-9', class: '9' }
];

// Elements
//  1)
interface initialList {
  id: string
  show: string
  variant: string
  text: string
}
export const initialListdata: initialList[] = [
  {
    id: "1",
    show: "Well done!",
    variant: "success",
    text: "You successfully read this alert message.",
  },
  {
    id: "2",
    show: "Heads up!",
    variant: "danger",
    text: " This alert needs your attention, but it's not super .",
  },
  {
    id: "3",
    show: "Warning!",
    variant: "warning",
    text: "Better check yourself, you're not looking too good.",
  },
  {
    id: "4",
    show: "Oh snap!",
    variant: "info",
    text: "Change a few things up and try submitting again.",
  },
];
// 2)

interface initialListdismissing {
  id: string
  show: string
  variant: string
  text: string
}
export const initialListdismissingdata: initialListdismissing[] = [
  {
    id: "1",
    show: "Holy guacamole!",
    variant: "warning",
    text: "You should check in on some of those fields below.",
  },
  {
    id: "2",
    show: "Holy guacamole!",
    variant: "success",
    text: "You should check in on some of those fields below.",
  },
  {
    id: "3",
    show: "Holy guacamole!",
    variant: "danger",
    text: " You should check in on some of those fields below.",
  },

  {
    id: "4",
    show: "Holy guacamole!",
    variant: "info",
    text: "You should check in on some of those fields below.",
  },
];

// 3)
interface initialListicons {
  id: string
  show: string
  variant: string
  text: string
  icons: string
}
export const initialListiconsdata: initialListicons[] = [
  {
    id: "1",
    show: "Default!",
    variant: "default",
    icons: "fe fe-download",
    text: "This is a warning alert—check it out that has an icon too!",
  },
  {
    id: "2",
    show: "Primary!",
    variant: "primary",
    icons: "fe fe-check-square",
    text: "This is a warning alert—check it out that has an icon too!",
  },
  {
    id: "3",
    show: "Success!",
    variant: "success",
    icons: "fe fe-thumbs-up",
    text: " This is a warning alert—check it out that has an icon too!",
  },
  {
    id: "4",
    show: "Info!",
    variant: "info",
    icons: "ti-bell",
    text: "This is a warning alert—check it out that has an icon too!",
  },
  {
    id: "5",
    show: "Warning!",
    variant: "warning",
    icons: "fe fe-info",
    text: "This is a warning alert—check it out that has an icon too!",
  },
  {
    id: "7",
    show: "Danger!",
    variant: "danger",
    icons: "fe fe-slash",
    text: "This is a warning alert—check it out that has an icon too!",
  },
];

// 4)
interface Alertdatalink {

  color: string

}
export const Alertdatalinkdata: Alertdatalink[] = [
  {
    color: "primary",
  },
  {
    color: "secondary",
  },
  {
    color: "success",
  },
  {
    color: "danger",
  },
  {
    color: "warning",
  },
  {
    color: "info",
  },
  {
    color: "light",
  },
  {
    color: "dark",
  },
];
// 5)
interface Alertdatacontent {
  bg: string
  fe: string
  text: string

}
export const Alertdatacontentdata: Alertdatacontent[] = [
  {
    bg: "success",
    fe: "fe fe-check-circle",
    text: "Well done!",
  },
  {
    bg: "warning",
    fe: "fe fe-alert-octagon",
    text: "Warning!",
  },
  {
    bg: "danger",
    fe: "fe fe-delete",
    text: "Error!",
  },
];

//avatar

// 1)
interface Avatarsizes {
  size: string
  src: string
  id: number

}
export const Avatarsizesdata: Avatarsizes[] = [
  { id: 1, size: 'sm', src: imagesData('female2') },
  { id: 2, size: '', src: imagesData('female3') },
  { id: 3, size: '', src: imagesData('female4') },
  { id: 4, size: 'md', src: imagesData('female5') },
  { id: 5, size: 'lg', src: imagesData('female6') },
  { id: 6, size: 'xl', src: imagesData('female7') }

];
// 2)
interface Initialsavatars {
  size: string
  text: string
  class: string
  color: string
  id: number

}
export const Initialsavatarsdata: Initialsavatars[] = [
  { id: 1, size: 'xs', text: 'A', class: '', color: 'primary' },
  { id: 2, size: 'sm', text: 'U', class: '', color: 'secondary' },
  { id: 3, size: '', text: 'c', class: '', color: 'info' },
  { id: 4, size: 'md', text: 'X', class: '', color: 'success' },
  { id: 4, size: 'lg', text: 'E', class: 'd-none d-sm-flex', color: 'warning' },
  { id: 5, size: 'xl', text: 'M', class: 'd-none d-sm-flex', color: 'danger' },
  { id: 6, size: 'xxl', text: 'NB', class: 'd-none d-sm-flex', color: 'pink' }

];

// 3) Stacked Avatars in Numbers and Stacked Avatars in Numbers
interface Stackedavatarsinnumbers {
  src: string
  id: number
}

export const Stackedavatarsinnumbersdata: Stackedavatarsinnumbers[] = [
  { id: 1, src: imagesData('female2') },
  { id: 2, src: imagesData('female6') },
  { id: 3, src: imagesData('female8') },
  { id: 4, src: imagesData('female10') },
  { id: 4, src: imagesData('female12') }

];

//end avatars

// Buttons

// 1)DEFAULT BUTTONS

interface Defaultbuttons {
  color: string
  text: string
  id: number
}

export const Defaultbuttonsdata: Defaultbuttons[] = [
  { id: 1, color:'primary' , text:'Primary' },
  { id: 2, color:'secondary' , text:'Secondary' },
  { id: 3, color:'success' , text:'Success' },
  { id: 4, color:'info' , text:'Info' },
  { id: 5, color:'warning' , text:'Warning' },
  { id: 6, color:'danger' , text:'Danger' },
  { id: 7, color:'light' , text:'Light' },
  { id: 8, color:'link' , text:'Link' }

];
// 2)DISABLED BUTTONS

interface Disabledbuttons {
  color: string
  text: string
  id: number
}

export const Disabledbuttonsdata: Disabledbuttons[] = [
  { id: 1, color:'primary' , text:'Primary' },
  { id: 2, color:'secondary' , text:'Secondary' },
  { id: 3, color:'success' , text:'Success' },
  { id: 4, color:'info' , text:'Info' },
  { id: 5, color:'warning' , text:'Warning' },
  { id: 6, color:'danger' , text:'Danger' },
  { id: 7, color:'light' , text:'Light' },
];

// 3)

interface Gradientbuttons {
  color: string
  text: string
  id: number
}

export const Gradientbuttonsdata: Gradientbuttons[] = [
  { id: 1, color:'primary' , text:'Primary' },
  { id: 2, color:'secondary' , text:'Secondary' },
  { id: 3, color:'success' , text:'Success' },
  { id: 4, color:'info' , text:'Info' },
  { id: 5, color:'warning' , text:'Warning' },
  { id: 6, color:'danger' , text:'Danger' }
];

// 4)

interface Lightbuttons {
  color: string
  text: string
  class: string
  id: number
}

export const Lightbuttonsdata: Lightbuttons[] = [
  { id: 1, color:'primary' , text:'Primary' , class:''},
  { id: 2, color:'secondary' , text:'Secondary' , class:''},
  { id: 3, color:'success' , text:'Success' , class:''},
  { id: 4, color:'info' , text:'Info' , class:''},
  { id: 5, color:'warning' , text:'Warning' , class:''},
  { id: 6, color:'danger' , text:'Danger' , class:''},
  { id: 6, color:'dark' , text:'Dark' , class:'text-dark'}
];
//5)OUTLINE BUTTONS ,ROUNDED BUTTONS and ROUNDED OUTLINE BUTTONS

interface Outlinebuttons {
  color: string
  text: string
  class: string
  id: number
}

export const Outlinebuttonsdata: Outlinebuttons[] = [
  { id: 1, color:'primary' , text:'Primary' , class:''},
  { id: 2, color:'secondary' , text:'Secondary' , class:''},
  { id: 3, color:'success' , text:'Success' , class:''},
  { id: 4, color:'info' , text:'Info' , class:''},
  { id: 5, color:'warning' , text:'Warning' , class:''},
  { id: 6, color:'danger' , text:'Danger' , class:''},
  { id: 6, color:'dark' , text:'Dark' , class:'text-light'},
  { id: 7, color:'light' , text:'Light' , class:''}
];

// 6)BUTTON WITH LOADING ANIMATION

interface Buttonwithloadinganimation {
  color: string
  class: string
  id: number
}

export const Buttonwithloadinganimationdata: Buttonwithloadinganimation[] = [
  { id: 1, color:'secondary' , class:'spiner'},
  { id: 3, color:'success' ,  class:'spiner'},
  { id: 2, color:'warning' , class:'spiner'},
  { id: 4, color:'primary' , class:'loaders'},
  { id: 5, color:'danger' , class:'loaders'},
  { id: 6, color:'info' ,  class:'loaders'}
];

// 7)BUTTON WITH ICONS

interface Buttonwithicons {
  color: string
  icon: string
  text: string
  id: number
}

export const Buttonwithiconsdata: Buttonwithicons[] = [
  { id: 1, color:'dark' , icon:'upload', text:''},
  { id: 3, color:'warning' ,  icon:'heart', text:'I like'},
  { id: 2, color:'outline-success' , icon:'check', text:''},
  { id: 4, color:'outline-primary' , icon:'plus', text:'More'},
  { id: 5, color:'secondary-light' , icon:'link', text:''},
  { id: 6, color:'info-light' ,  icon:'message-circle', text:'Comment'}
];

// 8)ICON BUTTONS
interface Iconbuttons {
  color: string
  icon: string
  class: string
  id: number
}

export const Iconbuttonsdata: Iconbuttons[] = [
  { id: 1, color:'primary', icon:'activity', class:''},
  { id: 3, color:'dark' ,  icon:'github', class:''},
  { id: 2, color:'success' , icon:'bell', class:''},
  { id: 4, color:'warning' , icon:'star', class:''},
  { id: 5, color:'danger' , icon:'trash', class:'d-none d-sm-flex'},
  { id: 6, color:'purple' ,  icon:'bar-chart', class:'d-none d-sm-flex'}
];

// end buttons

//badges
// 1)BUTTONS WITH SQUARE BADGES

interface Buttonswithsquarebadges {
  color: string
  icon: string
  class: string
  id: number
}

export const Buttonswithsquarebadgesdata: Buttonswithsquarebadges[] = [
  { id: 1, color:'primary', icon:'activity', class:'2'},
  { id: 3, color:'secondary' ,  icon:'github', class:'1'},
  { id: 2, color:'primary' , icon:'bell', class:'5'},
  { id: 4, color:'info' , icon:'star', class:'3'},
  { id: 5, color:'warning' , icon:'trash', class:'6'},
  { id: 6, color:'danger' ,  icon:'bar-chart', class:'4'}
];

// 2)BORDER BUTTONS WITH SQUARE BADGES
interface Borderbuttons {
  color: string
  icon: string
  class: string
  id: number
}

export const Borderbuttonsdata: Borderbuttons[] = [
  { id: 1, color:'primary', icon:'activity', class:'2'},
  { id: 3, color:'success' ,  icon:'github', class:'65'},
  { id: 2, color:'secondary' , icon:'bell', class:'1'},
  { id: 4, color:'info' , icon:'star', class:'5333'}
];

// 3)BUTTONS WITH ROUNDED BADGES
interface Buttonswithroundedbadges {
  color: string
  icon: string
  class: string
  id: number
}

export const Buttonswithroundedbadgesdata: Buttonswithroundedbadges[] = [
  { id: 1, color:'info', icon:'activity', class:'3'},
  { id: 3, color:'primary' ,  icon:'github', class:'22'},
  { id: 2, color:'secondary' , icon:'bell', class:'145'},
  { id: 4, color:'success' , icon:'star', class:'3225'}
];

// 4)Border buttons with rounded Badges

interface Borderbuttonswithroundedbadges {
  color: string
  class: string
  id: number
}

export const Borderbuttonswithroundedbadgesdata: Borderbuttonswithroundedbadges[] = [
  { id: 1, color:'primary', class:'2'},
  { id: 3, color:'success' , class:'65'},
  { id: 2, color:'secondary' , class:'43'},
  { id: 4, color:'info' , class:'563'}
];

// 5)LINK BADGES

interface Linkbadges {
  color: string
  text: string
  class1: string
  class: string
  class2: string
  id: number
}

export const Linkbadgesdata: Linkbadges[] = [
  { id: 1, text:'Primary',color:'primary', class1:'22', class2:'info', class:''},
  { id: 3, text:'Success',color:'success' , class1:'New', class2:'', class:''},
  { id: 2, text:'Info',color:'info' , class1:'5', class2:'', class:''},
  { id: 4, text:'Warning',color:'warning' , class1:'', class2:'badge-pill ', class:'fe fe-plus-circle tx-14'},
  { id: 5, text:'Danger',color:'danger' , class1:'Updated', class2:'badge-pill ', class:''}
];

// 6)LINK BADGES

interface Linkbadges1 {
  color: string
  text: string
  badge: string
  class1: string
  class2: string
  id: number
}

export const Linkbadgesdata1: Linkbadges1[] = [
  { id: 1, text:'Inbox',color:'primary', badge:'8',  class1:'', class2:'info'},
  { id: 2, text:'Inbox',color:'success' , badge:'82',  class1:'mb-2 mt-2', class2:'warning'},
  { id: 3, text:'Inbox',color:'danger' , badge:'539',  class1:'mb-2 mt-2', class2:'primary'},
  { id: 4, text:'Inbox',color:'teal' , badge:'9+',  class1:'mb-2 mt-2', class2:'warning'},
  { id: 5, text:'Inbox',color:'info' , badge:'99+',  class1:'mb-2 mt-2', class2:'danger'},
  { id: 6, text:'Inbox',color:'warning' , badge:'999+',  class1:'mb-2 mt-2', class2:'primary'}
];

// 7)BADGES

interface Badges {
  color: string
  class: string
  text: string
  id: number
}

export const Badgesdata: Badges[] = [
  { id: 1, color:'primary', class:'my-2', text:'Primary' },
  { id: 2, color:'secondary', class:'', text:'Secondary' },
  { id: 3, color:'success', class:'', text:'Success' },
  { id: 4, color:'danger', class:'', text:'Danger' },
  { id: 5, color:'warning', class:'', text:'Warning' },
  { id: 6, color:'info', class:'', text:'Info' },
  { id: 7, color:'light', class:'', text:'Light' },
  { id: 8, color:'dark', class:'', text:'Dark' }
];

interface Badges1 {
  color: string
  class: string
  text: string
  id: number
}

export const Badgesdata1: Badges1[] = [
  { id: 1, color:'primary', class:'my-2', text:'Primary' },
  { id: 2, color:'secondary', class:'', text:'Secondary' },
  { id: 3, color:'success', class:'', text:'Success' },
  { id: 4, color:'danger', class:'', text:'Danger' },
  { id: 5, color:'warning', class:'', text:'Warning' },
  { id: 6, color:'info', class:'', text:'Info' },
  { id: 7, color:'light', class:'', text:'Light' },
  { id: 8, color:'dark', class:'', text:'Dark' }
];

//end buttons

//Dropdowns
// 1)
interface Basic1  {
  color: string
  id: number
}

export const Basicdata1: Basic1 [] = [
  { id: 1, color:'primary'},
  { id: 2, color:'secondary' },
  { id: 3, color:'info' },
  { id: 4, color:'light' }
];

// 2)ROUNDED SPLIT BUTTON DROPDOWNS , OUTLINE SPLIT BUTTON DROPDOWNS , ROUNDED OUTLINE SPLIT BUTTON DROPDOWNS and OUTLINE SPLIT BUTTON DROPDOWNS

interface Roundedsplitdropdowns  {
  color: string
  id: number
}

export const Roundedsplitdropdownsdata1: Roundedsplitdropdowns [] = [
  { id: 1, color:'primary'},
  { id: 2, color:'danger' },
  { id: 3, color:'info' },
  { id: 4, color:'warning' },
  { id: 5, color:'light' }
];

// 3)ACTIVE MENU ITEM
interface Activemenu  {
  color: string
  id: number
}

export const Activemenudata: Activemenu [] = [
  { id: 1, color:'warning'},
  { id: 2, color:'teal' },
  { id: 3, color:'secondary' },
  { id: 4, color:'danger' }

];
// 4)DISABLED MENU ITEM
interface Disabledmenu  {
  color: string
  id: number
}

export const Disabledmenudata: Disabledmenu [] = [
  { id: 1, color:'primary'},
  { id: 2, color:'teal' },
  { id: 3, color:'danger' },
  { id: 4, color:'info' }

];

// 5)DROPDOWN HEADER
interface dropdownheader  {
  color: string
  id: number
}

export const dropdownheaderdata: dropdownheader [] = [
  { id: 1, color:'secondary'},
  { id: 2, color:'primary' },
  { id: 3, color:'info' },
  { id: 4, color:'warning' }

];

// 6)DROPDOWN DIVIDER

interface dropdowndivider  {
  color: string
  id: number
}

export const dropdowndividerdata: dropdowndivider [] = [
  { id: 1, color:'info'},
  { id: 2, color:'primary' },
  { id: 3, color:'danger' },
  { id: 4, color:'warning' }

];

// 7)DROPDOWN WITH ICONS

interface dropdownwithicons  {
  color: string
  class: string
  id: number
}

export const dropdownwithiconsdata: dropdownwithicons [] = [
  { id: 1, color:'danger', class:'mail'},
  { id: 2, color:'info' , class:'more-horizontal'},
  { id: 3, color:'secondary' , class:'more-vertical'},
  { id: 4, color:'outline-primary' , class:'settings '}

];

//ecommerce

interface cart  {

  id: number
  src:string
  name:string
  Size:string
  XXl:string
  bg:string
  color:string
  Quantity:string
  prices:string
  stockbg:string
  stock:string
}

export const Datacard: cart [] =[
  {
      id:1,
      src:imagesData('product01') ,
      name:"party wear",
      Size:"Size",
      XXl:"XXL",
      bg:"Color",
      color:" purple color",
      Quantity:"2",
      prices:"80.00",
      stockbg:"danger ",
      stock:"Out of stock"
  },
   {
      id:2,
      src:imagesData('product09')  ,
      name:"GLASS FLOWER POT",
      Size:"Size",
      XXl:"XL",
      bg:"Color",
      color:"Pink",
      Quantity:"2",
      prices:"50.30",
      stockbg:"success",
      stock:"In stock"
  },
  {
      id:3,
      src:imagesData('product08')  ,
      name:"MENS PARTY WEAR T-SHIRT",
      Size:"Size",
      XXl:"M",
      bg:"Color",
      color:"LightPink color",
      Quantity:"2",
      prices:"79.90",
      stockbg:"danger ",
      stock:"Out of stock"
  },
  {
      id:4,
      src:imagesData('product02')  ,
      name:"WHITE EAR BUDS",
      Size:"Size",
      XXl:"11-12 inches",
      bg:"Color",
      color:"purple color",
      Quantity:"2",
      prices:"79.90",
      stockbg:"success",
      stock:"In stock"
  }
];

//tags

interface tags  {
  id:number
  class:string

}
export const Tagsdata: tags [] =[
  {id : 1 , class:'primary '},
  {id : 2 , class:'secondary '},
  {id : 3 , class:'success '},
  {id : 4 , class:'warning '},
  {id : 5 , class:'teal '},
  {id : 6 , class:'danger '},

];
