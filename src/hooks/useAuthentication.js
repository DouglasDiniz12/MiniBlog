// Google FireBase
import { db,app } from "../firebase/config"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth"

// React
import { useState, useEffect } from "react"

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // CleanUp
  // Deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  function checkIsCancelled() {
    if (cancelled) {
      return
    }
  }

  const auth = getAuth(app)

  // Register
  const createUser = async (data) => {
    checkIsCancelled()

    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, { displayName: data.displayName })

      setLoading(false)

      return user
    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      let systemErrorMessage

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      setLoading(false)
      setError(systemErrorMessage)
    }
  }

  // Login - SignIn
  const login = async (data) => {
    checkIsCancelled()

    setLoading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)
    } catch (error) {
      let systemErrorMessage

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."
      } else if (error.message.includes("invalid-login-credentials")) {
        systemErrorMessage = "Usuário ou senha incorretos, tente novamente."
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde."
      }

      setError(systemErrorMessage)
      setLoading(false)
    }
  }

  // Logout - SignOut
  const logout = () => {
    checkIsCancelled()

    signOut(auth)
  }

  // Monitoring "Cancelled" to prevent memory leak
  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }
}