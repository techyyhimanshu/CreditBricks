import { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import apiService from "../../../../common/redux/api"
import { showToast, Toaster } from "../../../../common/services/toastServices"
import 'react-toastify/dist/ReactToastify.css'


const getUrlData = () => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')?.replace(/'/g, ""); // Remove single quotes
    const code = params.get('code')?.replace(/'/g, ""); // Remove single quotes
    return { id, code }
}

const getReGenerateLink = async (id: string) => {
    const res = await apiService.RegenerateVerifyLink(id)
    return res
}

const getverification = async (id: string, code: string) => {
    const response = await apiService.VerifyEmail(id, code)
    return response
}

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true)
    const [responsemsg, setResponsemsg] = useState("")

    useEffect(() => {
        const { id, code } = getUrlData()
        if (id && code) {
            getverification(id, code)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        showToast("success", "email verified")
                        setResponsemsg("email verification successful")
                    }
                    else {
                        showToast("error", res.data.message)
                        setResponsemsg(res.data.message)
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }
    }, [])

    const regenerateLink = async () => {
        const { id } = getUrlData()
        if (id) {
            getReGenerateLink(id)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        showToast("success", "Email verification link sent")
                    }
                    else {
                        showToast("error", res.data.error)
                    }
                })
                .catch(() => showToast("error", "server down"))
        }
    }


    return (
        <div className="text-center" style={{ backgroundColor: "#f3f3f3", height: "100vh" }}>
            {
                loading && <Spinner style={{ width: "4rem", height: "4rem", marginTop: "45vh" }}
                    animation="border"
                    variant="success"
                    className="spinner-border text-success mt-45vh"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            {
                !loading && <Toaster />
            }
            {
                !loading && responsemsg.includes('successful') && <div className="pt-20vh h-100vh loginbg"> <div className="col-sm-4 m-auto card pb-5"><i className="bi bi-check-circle tx-60 mt-4 text-success"></i> <h3 className="mt-4">Email verification successful.</h3> <p className="tx-16 mb-4">Please click on login button to login </p> <Button href="/" className="btn d-block btn-primary m-auto col-sm-3">Login </Button></div></div>
            }
            {
                !loading && responsemsg.includes('failed') && <div className="pt-20vh loginbg h-100vh"> <div className="col-sm-4 m-auto card pb-5"><i className="bi bi-x-circle tx-60 mt-4 text-danger"></i> <h3>Email verification failed!</h3> <p className="tx-16 mb-4">Please click on regenerate verification button.</p><Button onClick={regenerateLink} className="btn d-block btn-primary m-auto col-sm-5">Regenerate Verification </Button></div></div>
            }
            {
                !loading && responsemsg.includes('sign up') && <div className="pt-20vh loginbg h-100vh"> <div className="col-sm-4 m-auto card pb-5"><i className="bi bi-x-circle tx-60 mt-4 text-danger"></i> <h3>User Not Registered!</h3> <p className="tx-16 mb-4">Please click on Signup button.</p><Button href="/pages/authentication/sigup" className="btn d-block btn-primary m-auto col-sm-5">Sign up </Button></div></div>
            }
        </div>
    )
}

export default VerifyEmail