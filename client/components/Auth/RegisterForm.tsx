import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import {
  isThereEmptyField,
  objLength,
  PasswordSchema,
  RegisterSchema,
} from "../../helpers/validators"
import { getInputClass } from "../../helpers/DOM"
import { useRouter } from "next/router"
import { onSubmitRegister } from "../../store/actions/auth"
import Image from "next/image"
import gsap from "gsap"

function RegisterForm() {
  const [photo, setPhoto] = useState<null | Blob>(null)
  const [photoURL, setPhotoURL] = useState("")
  const [step, setStep] = useState<1 | 2>(1)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const formRef2 = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/")
    if (router.query["from"] && formRef) {
      gsap.fromTo(
        formRef.current,
        { y: "-60%", opacity: 0 },
        { duration: 1, y: 0, opacity: 1, delay: 0.5 }
      )
    }
  }, [formRef, router])

  useEffect(() => {
    if (photo) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoURL(reader.result!.toString())
      }
      reader.readAsDataURL(photo)
    }
  }, [photo])

  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", age: "", sex: "" },
    onSubmit: async () => {
      if (formRef) {
        await gsap.to(formRef.current, { x: "-100%", duration: 0.3, opacity: 0 })
        setStep(2)
        await gsap.fromTo(
          formRef2.current,
          { x: "-100%", duration: 0.3, opacity: 0 },
          { x: 0, duration: 0.3, opacity: 1 }
        )
      }
    },
    validationSchema: RegisterSchema,
  })

  const backButtonClick = async () => {
    if (formRef2) {
      await gsap.to(formRef2.current, { x: "100%", duration: 0.3, opacity: 1 })
      setStep(1)
      await gsap.fromTo(
        formRef.current,
        { x: "100%", duration: 0.3, opacity: 0 },
        { x: 0, duration: 0.3, opacity: 1 }
      )
    }
  }

  const formik2 = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    onSubmit: async (values) => {
      if (photo) {
        const data = { ...values, ...formik.values }
        const err = await onSubmitRegister(data, photo)
        if (err) {
          setError(err)
        } else {
          router.push("/")
        }
      }
    },
    validationSchema: PasswordSchema,
  })

  const Redirect = async () => {
    await gsap.to(formRef.current, { duration: 0.5, y: "-100%", opacity: 0 })
    router.push("login?from=register")
  }

  return (
    <div className="flex h-[100vh] bg-gray-200 items-center justify-center">
      {step === 1 && (
        <form
          ref={formRef}
          onSubmit={formik.handleSubmit}
          className="grid bg-white rounded-lg shadow-xl p-2 w-11/12 md:w-9/12 lg:w-1/2"
        >
          <div className="flex justify-center py-2">
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
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Registration</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Email
            </label>
            <input
              className={`${getInputClass(formik.errors.email)}`}
              type="text"
              placeholder="example1@gmail.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <small className="text-red-500 ml-2 mt-1">{formik.errors.email}</small>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1 relative">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                First Name
              </label>
              <input
                className={`${getInputClass(formik.errors.firstName)}`}
                type="text"
                placeholder="Joe"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName && (
                <small className="text-red-500 ml-2 mt-1 absolute bottom-[-30%]">
                  {formik.errors.firstName}
                </small>
              )}
            </div>
            <div className="grid grid-cols-1 relative">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Last Name
              </label>
              <input
                className={`${getInputClass(formik.errors.lastName)}`}
                type="text"
                placeholder="Refkin"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && (
                <small className="text-red-500 ml-2 mt-1 absolute bottom-[-30%]">
                  {formik.errors.lastName}
                </small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Selection
            </label>
            <select
              value={formik.values.sex}
              onChange={formik.handleChange}
              name="sex"
              className={`${getInputClass(formik.errors.sex)}`}
            >
              <option hidden>Choose your gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {formik.errors.sex && (
              <small className="text-red-500 ml-2 mt-1">{formik.errors.sex}</small>
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Age
            </label>
            <input
              className={`${getInputClass(formik.errors.age)}`}
              type="text"
              placeholder="27"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            {formik.errors.age && (
              <small className="text-red-500 ml-2 mt-1">{formik.errors.age}</small>
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
              Upload Photo
            </label>
            <div className="flex justify-around">
              <div className={`flex items-center justify-center ${photoURL ? "w-2/4" : "w-full"}`}>
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                      Select a photo
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files![0])}
                  />
                </label>
              </div>
              {photoURL && <Image src={photoURL} height={100} width={100} />}
            </div>
          </div>

          <div className="flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="submit"
              disabled={
                objLength(formik.errors) > 0 || isThereEmptyField(formik.values) || !!!photo
              }
              className="w-auto bg-purple-500 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-200 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Continue
            </button>
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <span onClick={Redirect} className="text-blue-400 cursor-pointer">
              Login
            </span>
          </p>
        </form>
      )}
      {step === 2 && (
        <form
          ref={formRef2}
          onSubmit={formik2.handleSubmit}
          className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2"
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
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Tinder</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Password
            </label>
            <input
              className={`${getInputClass(formik2.errors.password)}`}
              type="password"
              placeholder="***********"
              name="password"
              onChange={formik2.handleChange}
              value={formik2.values.password}
            />
            {formik2.errors.password && (
              <small className="text-red-500 ml-2 mt-1">{formik2.errors.password}</small>
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Confirm Password
            </label>
            <input
              className={`${getInputClass(
                formik2.values.confirmPassword !== formik2.values.password
              )}`}
              type="password"
              placeholder="***********"
              name="confirmPassword"
              onChange={formik2.handleChange}
              value={formik2.values.confirmPassword}
            />
            {formik2.values.confirmPassword !== formik2.values.password && (
              <small className="text-red-500 ml-2 mt-1">Passwords don't match</small>
            )}
          </div>

          <div className="text-center text-red-500 mt-2">{error}</div>
          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              onClick={backButtonClick}
              className="w-auto bg-blue-500 hover:bg-blue-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Back
            </button>
            <button
              disabled={objLength(formik2.errors) > 0 || isThereEmptyField(formik2.values)}
              type="submit"
              className="w-auto bg-purple-500 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-200 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Create Account
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default RegisterForm
