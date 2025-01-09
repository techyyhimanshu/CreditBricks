import axios, { AxiosRequestConfig } from 'axios';
import store from '../store/store';
import { refreshToken, checkTokenExpiration } from '../actions/authActions';
import { Igetdata } from '../services/database';

class ApiService {
  private axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_DELOVATE_HOST as string,
  });

  private axiosInit = axios.create({
    baseURL: import.meta.env.VITE_DELOVATE_HOST as string,
  });

  calendar=import.meta.env.VITE_CALENDAR_HOST
  document=import.meta.env.VITE_DOCUMENT_HOST
  user=import.meta.env.VITE_USER_HOST
  offering=import.meta.env.VITE_OFFERING_HOST
  investingAccount=import.meta.env.VITE_INVESTING_ACCOUNT_HOST

  // isRefreshing = false;
  // failedQueue: any[] = [];

  // processQueue = (error: AxiosError | null) => {
  //   this.failedQueue.forEach(prom => {
  //     if (error) {
  //       prom.reject(error);
  //     } else {
  //       prom.resolve();
  //     }
  //   });
  //   this.failedQueue = [];
  // };

  constructor() {
    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const { auth } = store.getState();
        if (auth.isAuthenticated && auth.token) {
          const tokenExp = checkTokenExpiration(auth.token);
          if (!tokenExp) {
            try {
              await refreshToken();
            } catch (error) {
              console.error('Error refreshing tokennn:', error);
            }
          }
          config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // this.axiosInstance.interceptors.request.use(
    //   async (config: AxiosRequestConfig) => {
    //     const { auth } = store.getState();
    //     if (auth.isAuthenticated && auth.token) {
    //       config.headers.Authorization = `Bearer ${auth.token}`;
    //     }
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );

    // this.axiosInstance.interceptors.response.use(
    //   (response) => response,
    //   async (error: any) => {
    //     const originalRequest = error.config;

    //     // Check for 401 errors
    //     if (error.response?.status === 401 && !originalRequest._retry) {
    //       if (this.isRefreshing) {
    //         return new Promise((resolve, reject) => {
    //           this.failedQueue.push({ resolve, reject });
    //         })
    //           .then(() => this.axiosInstance(originalRequest))
    //           .catch((err) => Promise.reject(err));
    //       }
    //       originalRequest._retry = true;
    //       this.isRefreshing = true;
    //       const getToken = localStorage.getItem("token")
    //       const getrefreshToken = localStorage.getItem('refreshToken');
    //       // Attempt to refresh the token
    //       try {
    //         const response = await axios.post('/auth/refreshToken', { token:getToken, refreshToken:getrefreshToken })
    //         const { token, refereshToken } = response.data.data
    //         console.log("checkfirstrefresh :", refereshToken)
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('refreshToken', refereshToken)
    //         // originalRequest.headers.Authorization = `Bearer ${response}`;
    //         this.processQueue(null)
    //         return this.axiosInstance(originalRequest); // Retry original request
    //       } catch (refreshError) {
    //         // If the first refresh attempt fails, try again
    //         try {
    //           const secondResponse = await axios.post('/auth/refreshToken', { token:getToken, refreshToken:getrefreshToken })
    //           const { token, refereshToken } = secondResponse.data.data
    //           console.log("secondrefresh :", refereshToken)
    //           localStorage.setItem('token', token);
    //           localStorage.setItem('refreshToken', refereshToken)
    //           // originalRequest.headers.Authorization = `Bearer ${secondResponse}`;
    //           this.processQueue(null)
    //           return this.axiosInstance(originalRequest); // Retry original request again
    //         } catch (secondError: any) {
    //           // If the second refresh attempt also fails, log out the user
    //           this.processQueue(secondError);
    //           console.log("cant get refresh token")
    //           store.dispatch(logout());
    //           console.log("user finally logged out")
    //           return Promise.reject(secondError);
    //         }
    //       } finally {
    //         this.isRefreshing = false
    //       }
    //     }

    //     return Promise.reject(error);
    //   }
    // );
  }

  async login(frmParam: any): Promise<any> {
    try {
      const response = await this.axiosInit.post('/auth/signIn', frmParam);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async SignUp(frmParam: any): Promise<object> {
    try {
      const response = await this.axiosInit.post('/auth/signup', frmParam);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async EmailForReset(userName: string) {
    try {
      const response = await this.axiosInit.post('/auth/generatePasswordResetLink', userName);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async GetUserInfo(id: string, type: string) {
    const data = { "token": id, "loginType": type }
    try {
      const response = await this.axiosInit.post('/auth/socialSignIn', data);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async ResetPassword(data: object) {
    try {
      const response = await this.axiosInit.post('/auth/resetPassword', data)
      return response
    } catch (error: any) {
      return error.response
    }
  }

  async VerifyEmail(id: string, code: string) {
    const data = { id, token: code }
    try {
      const response = await this.axiosInit.post('/auth/verifyEmail', data)
      return response
    } catch (error: any) {
      return error.response
    }
  }

  async RegenerateVerifyLink(id: string) {
    const data = { id }
    try {
      const response = await this.axiosInit.post('/auth/sendEmailVerification', data)
      return response
    } catch (error: any) {
      return error.response
    }
  }

  // async PostEvent(data: object) {
  //   try {
  //     const response = await this.axiosInstance.post('/api/createAppointments', data)
  //     return response;
  //   } catch (err: any) {
  //     return err.response
  //   }
  // }

  async GetAllEvent(type?: number) {
    try {
      const url = type !== undefined
        ? `${this.calendar}/getAllAppointments?type=${type}`
        : `${this.calendar}/getAllAppointments`;
      const response = await axios.get(url)
      return response;
    } catch (err: any) {
      return err.response;
    }
  }

  async CreateAppointment(data: object) {
    try {
      const response = await axios.post(`${this.calendar}/createAppointments`, data)
      return response;
    } catch (err: any) {
      return err.response;
    }
  }

  async UpdateAppointment(data: object, id: string) {
    try {
      const response = await axios.put(`${this.calendar}/updateAppointments/${id}`, data)
      return response;
    } catch (err: any) {
      return err.response;
    }
  }

  async UploadDocument(data:any) {
    try {
      const response = await axios.post(`${this.document}/uploadDocuments/upload`,data)
      return response;
    } catch (err:any) {
      return err.response;
    }
  }

  async DeleteDocument(id:string){
    try{
      const response = await axios.put(`${this.document}/updateDocuments/${id}`)
      return response;
    }catch(err:any){
      return err.response;
    }
  }

  async GetDocumentUrl(id:string){
    try{
      const response = await axios.get(`${this.document}/documents/fileURL/${id}`)
      return response;
    }catch(err:any){
      return err.response;
    }
  }

  async GetOfferingData(args: Igetdata){
    
    const { url, pages, perPage,totalfilter } = args
        const params: any = {
            limit: perPage,
            skip: (pages * perPage) - perPage,
        };

        if (totalfilter) {
            Object.keys(totalfilter).forEach(key => {
                const filterValue = totalfilter[key];
                params[key] = filterValue;
            });
        }
        console.log(params)
        try {
            const res = await axios.get(`${url}`,{params})
            console.log("response",res.data)
            return res
        } catch (err) {
            return err
        }
  }

  async GetSingleOffering(data:any){
    try{
      const response= await axios.post(`${this.offering}/project`,data)
      return response
    }catch(err:any){
      return err.response
    }
  }

  async CreateUser(data:any){
    try{
      const response= await axios.post(`${this.user}/createuser`,data)
      return response
    }catch(err:any){
      return err.response
    }
  }

  async GetUserData(id:string){
    const params:any={
      id:id
    }
    try{
      const response= await axios.get(`${this.user}/user`,{params})
      return response
    }catch(err:any){
      return err.response
    }
  }

  async DeleteUser(id:string,data:any){
    try{
      const response=await axios.post(`${this.user}/user/${id}`,data)
      return response;
    }catch(err:any){
      return err.response
    }
  }

  async UpdateUserData(id:string,data:any){
    try{
      const response = await axios.post(`${this.user}/user/${id}`,data)
      return response
    }catch(err:any){
      return err.response
    }
  }

  async GetInvestingDetails(id:string){
    try{
      const response = await axios.get(`${this.investingAccount}/getInvestingAccountDetails/${id}`)
      return response
    }catch(err:any){
      return err.response
    }
  }

  async CreateInvestingAccount(data:any){
    try{
      const response = await axios.post(`${this.investingAccount}/createInvestingAccount`,data)
      return response
    }catch(err:any){
      return err.response
    }
  }

  async UpdateInvestingAccount(id:string,data:any){
    try{
      const response=await axios.put(`${this.investingAccount}/updateInvestingAccount/${id}`,data)
      return response
    }catch(err:any){
      return err.response;
    }
  }




  // async GetLinkedInAuth(code:string,type:string){
  //   const data = {code,"loginType":type}
  //   try{
  //     const response = await axios.post('http://localhost:8000/data',data)
  //     return response
  //   }catch(error:any){
  //     return error.response
  //   }
  // }

}



const apiService = new ApiService();

export default apiService;
