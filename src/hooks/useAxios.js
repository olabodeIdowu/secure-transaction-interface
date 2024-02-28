import axios from "axios";

console.log(process.env.EXPO_PUBLIC_STAGING_URL);

export const Axios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_STAGING_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const axiosfORMS = axios.create({
  baseURL: process.env.EXPO_PUBLIC_STAGING_URL,
  headers: {
    "Content-Type": "application/multipart/form-data",
  },
});

// export const axiosURLEncoded = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_STAGING_URL,
//   headers: {
//     'content-type': ['application/x-www-form-urlencoded']
//   }
// });

// export function useAxiosURLEncoded() {
//   const { auth } = useContext(AuthContext);
//   const refresh = useRefreshToken();

//   useEffect(() => {
//     // Add a request interceptor
//     const requestIntercept = axiosURLEncoded.interceptors.request.use(
//       function(config) {
//         // Do something before request is sent
//         // console.log(config);
//         if (!config.headers['Authorization']) {
//           config.headers['Authorization'] = `Bearer ${auth?.userToken}`;
//         }
//         return config;
//       },
//       function(error) {
//         // Do something with request error
//         return Promise.reject(error);
//       }
//     );

//     // Add a response interceptor
//     const responseIntercept = axiosURLEncoded.interceptors.response.use(
//       function(response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // console.log(response, response.status);
//         // Do something with response data
//         return response;
//       },
//       async function(error) {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         const prevRequest = error?.config;
//         // console.log(error, prevRequest, error?.response);
//         // Do something with response error
//         if (
//           error?.response?.status === 401 ||
//           error?.response?.status === 403
//         ) {
//           await refresh();

//           prevRequest.headers['Authorization'] = `Bearer ${auth.userToken}`;
//           prevRequest.headers['X-Refresh-Token'] = `${auth.refreshToken}`;

//           console.log(prevRequest.headers);

//           return Promise.reject(error);
//         }
//       }
//     );

//     return () => {
//       axiosURLEncoded.interceptors.request.eject(requestIntercept);
//       axiosURLEncoded.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);

//   return axiosURLEncoded;
// }
