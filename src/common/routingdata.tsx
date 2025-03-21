import { lazy } from 'react';


const Dashboard = lazy(() => import('../components/dashboard/dashboard1/dashboard'));
const Error501 = lazy(() => import('../components/pages/authentication/501error/501error'));
const Accounts = lazy(() => import('../components/accounts/accounts'));
const SocietyMaster = lazy(() => import('../components/masters/society/societymaster'));
const AddSocietyMaster = lazy(() => import('../components/masters/society/addsocietymaster'));
const EditSocietyMaster = lazy(() => import('../components/masters/society/editsocietymaster'));
const SocietyView = lazy(() => import('../components/masters/society/societyview'));
const TowerMaster = lazy(() => import('../components/masters/towermaster'));
const WingMaster = lazy(() => import('../components/masters/wingmaster'));
const PropertyMaster = lazy(() => import('../components/masters/property/propertymaster'));
const AddPropertyMaster = lazy(() => import('../components/masters/property/addpropertymaster'));
const EditPropertyMaster = lazy(() => import('../components/masters/property/editpropertymaster'));
const PropertyView = lazy(() => import('../components/masters/property/propertyview'));
const Roles = lazy(() => import('../components/masters/roles'));
const Users = lazy(() => import('../components/masters/users'));
const MobileApp = lazy(() => import('../components/masters/mobileapp'));
const UserPermission = lazy(() => import('../components/masters/userpermission'));
const TermsCondition = lazy(() => import('../components/masters/termscondition'));
const UserProfile = lazy(() => import('../components/userprofile/userprofile'));
const MembersMaster = lazy(() => import('../components/masters/members/membersmaster'));
const AddMembersMaster = lazy(() => import('../components/masters/members/addmembers'));
const MembersProfile = lazy(() => import('../components/masters/members/membersProfile'));
const VendorMaster = lazy(() => import('../components/masters/vendor/vendormaster'));
const AddVendorMaster = lazy(() => import('../components/masters/vendor/addvendormaster'));
const VendorView = lazy(() => import('../components/masters/vendor/vendorview'));
const ParentEntity = lazy(() => import('../components/parententity/parententity'));
const Loans = lazy(() => import('../components/loans/loans'));
const Tenant = lazy(() => import('../components/tenant/tenant'));
const TenantView = lazy(() => import('../components/tenant/tenantview'));
const AddTenant = lazy(() => import('../components/tenant/addtenant'));
const Complaints = lazy(() => import('../components/complaints/complaints'));
const Applications = lazy(() => import('../components/applications/applications'));
const Notices = lazy(() => import('../components/notices/notices'));
const Announcements = lazy(() => import('../components/announcement/announcement'));
const Parking = lazy(() => import('../components/parking/parking'));

export const Routingdata = [
  //Dashboard
  { path: `${import.meta.env.BASE_URL}dashboard/dashboard1`, element: <Dashboard /> },
  { path: `${import.meta.env.BASE_URL}pages/authentication/501error`, element: <Error501 /> },
  { path: `${import.meta.env.BASE_URL}accounts/accounts`, element: <Accounts /> },
  { path: `${import.meta.env.BASE_URL}society/societymaster`, element: <SocietyMaster /> },
  { path: `${import.meta.env.BASE_URL}society/addsocietymaster`, element: <AddSocietyMaster /> },
  { path: `${import.meta.env.BASE_URL}society/editsocietymaster/:identifier`, element: <EditSocietyMaster /> },
  { path: `${import.meta.env.BASE_URL}society/societyview/:identifier`, element: <SocietyView /> },
  { path: `${import.meta.env.BASE_URL}parententity/parententity`, element: <ParentEntity /> },
  { path: `${import.meta.env.BASE_URL}property/propertymaster`, element: <PropertyMaster /> },
  { path: `${import.meta.env.BASE_URL}property/addpropertymaster`, element: <AddPropertyMaster /> },
  { path: `${import.meta.env.BASE_URL}property/editpropertymaster/:identifier`, element: <EditPropertyMaster /> },
  { path: `${import.meta.env.BASE_URL}property/propertyview/:identifier`, element: <PropertyView /> },
  //Added tower master
  { path: `${import.meta.env.BASE_URL}masters/towermaster`, element: <TowerMaster /> },
  { path: `${import.meta.env.BASE_URL}masters/wingmaster`, element: <WingMaster /> },
  { path: `${import.meta.env.BASE_URL}masters/roles`, element: <Roles /> },
  { path: `${import.meta.env.BASE_URL}masters/users`, element: <Users /> },
  { path: `${import.meta.env.BASE_URL}masters/mobileapp`, element: <MobileApp /> },
  { path: `${import.meta.env.BASE_URL}masters/userpermission`, element: <UserPermission /> },
  { path: `${import.meta.env.BASE_URL}masters/termscondition`, element: <TermsCondition /> },
  { path: `${import.meta.env.BASE_URL}userprofile/userprofile`, element: <UserProfile /> },
  { path: `${import.meta.env.BASE_URL}members/membersmaster`, element: <MembersMaster /> },
  { path: `${import.meta.env.BASE_URL}members/addmembers`, element: <AddMembersMaster /> },
  { path: `${import.meta.env.BASE_URL}members/membersProfile/:identifier`, element: <MembersProfile /> },
  { path: `${import.meta.env.BASE_URL}vendor/vendormaster`, element: <VendorMaster /> },
  { path: `${import.meta.env.BASE_URL}vendor/addvendormaster`, element: <AddVendorMaster /> },
  { path: `${import.meta.env.BASE_URL}vendor/vendorview/:identifier`, element: <VendorView /> },
  { path: `${import.meta.env.BASE_URL}loans/loans`, element: <Loans /> },
  { path: `${import.meta.env.BASE_URL}tenant/tenant`, element: <Tenant /> },
  { path: `${import.meta.env.BASE_URL}tenant/tenantview/:identifier`, element: <TenantView /> },
  { path: `${import.meta.env.BASE_URL}tenant/addtenant`, element: <AddTenant /> },
  { path: `${import.meta.env.BASE_URL}complaints/complaints`, element: <Complaints /> },
  { path: `${import.meta.env.BASE_URL}applications/applications`, element: <Applications /> },
  { path: `${import.meta.env.BASE_URL}notices/notices`, element: <Notices /> },
  { path: `${import.meta.env.BASE_URL}announcement/announcement`, element: <Announcements /> },
  { path: `${import.meta.env.BASE_URL}parking/parking`, element: <Parking /> }
];

export const Sidebarcomponents = [
  { path: `${import.meta.env.BASE_URL}dashboard/dashboard1`, title: 'Dashboard-1' },
  { path: `${import.meta.env.BASE_URL}pages/authentication/sigin`, title: "Sign In" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/sigup`, title: "Sign Up" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/forgotpassword`, title: "Forgot Password" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/resetpassword`, title: "Reset Password" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/lockscreen`, title: "Lockscreen" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/underconstruction`, title: "UnderConstruction" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/404error`, title: "404 Error" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/500error`, title: "500 Error" },
  { path: `${import.meta.env.BASE_URL}pages/authentication/501error`, title: "501 Error" },

];
