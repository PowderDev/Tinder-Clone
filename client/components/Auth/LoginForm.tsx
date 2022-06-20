import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import { isThereEmptyField, LoginSchema, objLength } from "../../helpers/validators"
import { getInputClass } from "../../helpers/DOM"
import { onSubmitLogin } from "../../store/actions/auth"
import gsap from "gsap"
import { useRouter } from "next/router"

function LoginForm() {
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (router.query["from"] && formRef) {
      gsap.fromTo(
        formRef.current,
        { y: "60%", opacity: 0 },
        { duration: 1, y: 0, opacity: 1, delay: 0.5 }
      )
    }
  }, [formRef, router.query])

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/")
  }, [router])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const err = await onSubmitLogin(values)
      if (err) {
        setError(err)
      } else {
        router.push("/")
      }
    },
    validationSchema: LoginSchema,
  })

  const Redirect = async () => {
    await gsap.to(formRef.current, { duration: 0.5, y: "100%", opacity: 0 })
    router.push("register?from=login")
  }

  return (
    <div className="flex h-[100vh] overflow-hidden bg-gray-200 items-center justify-center">
      <form
        ref={formRef}
        onSubmit={formik.handleSubmit}
        className="grid bg-white rounded-lg shadow-xl py-2 w-11/12 md:w-9/12 lg:w-1/2"
      >
        <div className="flex justify-center py-4">
          <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex">
            <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Login</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Email
          </label>
          <input
            className={`${getInputClass(formik.errors.email)}`}
            type="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={(e) => {
              formik.handleChange(e)
              setError("")
            }}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <small className="text-red-500 ml-2 mt-1">{formik.errors.email}</small>
          )}
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Password
          </label>
          <input
            className={`${getInputClass(formik.errors.password)}`}
            type="password"
            placeholder="***********"
            name="password"
            onChange={(e) => {
              formik.handleChange(e)
              setError("")
            }}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <small className="text-red-500 ml-2 mt-1">{formik.errors.password}</small>
          )}
        </div>

        <div className="text-center text-red-500 mt-2">{error}</div>
        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button
            disabled={objLength(formik.errors) > 0 || isThereEmptyField(formik.values)}
            type="submit"
            className="w-auto bg-purple-500 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-200 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Login
          </button>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <span onClick={Redirect} className="text-blue-400 cursor-pointer">
            Registration
          </span>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
