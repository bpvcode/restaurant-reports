import { FC, useState } from "react";
import styles from './SignIn.module.css'
import Typical from 'react-typical';
import { Restaurants, Roles } from "./RolesEnum";
import { Select, Option } from  "@material-tailwind/react"
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import axios from "axios";

export interface UserModal {
    id: string,
    name: string,
    password: string,
    roles: Roles[],
    restaurantRoles: Restaurants[],
    selectedRestaurant: string,
    jwtToken: string
}

interface UserProps{
    onSignIn: (newUser: UserModal) => void
}

const SignIn: FC <UserProps> = ({onSignIn}) => {

    const [user, setUser] = useState<UserModal>()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [restaurant, setRestaurant] = useState<Restaurants>()
    const [isError, setIsError] = useState<boolean>(false)
    const [errorTitle, setErrorTitle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const onChangeNameHandler = (event: any) => {
        setName(event.target.value)
    }

    const onChangePasswordHandler = (event: any) => {
        setPassword(event.target.value)
    }

    const onChangeRestaurantHandler = (event: any) => {
        setRestaurant(event)
    }

    const verifyUser = async (name: string, password: string, restaurant: Restaurants) => {
        await axios({
            // Endpoint to send files
            url: "/.netlify/functions/SignIn",
            method: "POST",
            headers: {
            //   authorization: "your TOKEN comes here",
            },
            data: {name, password, restaurant},
          }).then((response) => {
            setUser(response.data)
            onSignIn(response.data)
          })
          .catch((error) => {
            setName('')
            setPassword('')
            setRestaurant(undefined)
            setUser(undefined)
            setErrorTitle(`Sign In Error`)
            setErrorMessage(`Make sure you input your name and password correct and choose a restaurant that you are allow to see`)
            setIsError(true)
          })
    }

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        verifyUser(name, password, restaurant as Restaurants)
    }

    const onIsErrorHandler = (isError: boolean) => {
        setIsError(isError)
    }

    return (
        <>
        {isError
            ? <ErrorModal isErrorHandler={onIsErrorHandler} title={errorTitle} message={errorMessage}/>
            :
            <div className={styles.SignInScreen}>
            <div className={styles.Typing}>
                <Typical
                steps={[
                    "Welcome Cabrones 👋",
                    4000,
                    "Don't forget...",
                    4000,
                    "Have fun and drink Tequila 🍸",
                    4000
                ]}
                loop={Infinity}
                wrapper="span"
                />
            </div>
            <div className={styles.Authentication}>

                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-[80%] p-6 m-auto bg-none rounded-md shadow-2xl shadow-[#01C38D]/30 ring ring-2 ring-[#01C38D]/10 lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-[#01C38D]/80 no-underline uppercase">
                        Sign in
                        </h1>
                        <form className="mt-6" onSubmit={onSubmitHandler}>
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={onChangeNameHandler}
                                    className="block w-full px-4 py-2 mt-2 text-[#191E29] bg-white border rounded-md focus:border-[#696E79] focus:ring-[#696E79] focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChangePasswordHandler}
                                    className="block w-full px-4 py-2 mt-2 text-[#191E29] bg-white border rounded-md focus:border-[#696E79] focus:ring-[#696E79] focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="w-full">
                                <Select className="text-white" color="gray" variant="outlined" label="Select Restaurant" onChange={onChangeRestaurantHandler}>
                                    <Option className="text-[#282c34] selected:bg-[#01C38D] focus:bg-[#01C38D] focus:text-white focus:font-bold" value="Cabron">El Cabron - Taquería</Option>
                                    <Option className="text-[#282c34] selected:bg-[#01C38D] focus:bg-[#01C38D] focus:text-white focus:font-bold" value="COW">COW - Beef & cocktails</Option>
                                </Select>
                            </div>

                            <div className="mt-12">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01C38D] rounded-md hover:bg-[#01C38D]/60  focus:outline-none focus:bg-white font-bold focus:text-[#191E29]">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        }
      </>
    )
}

export default SignIn
