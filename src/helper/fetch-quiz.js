import { useEffect, useState } from "react"
import { generateQuiz } from "./quiz"

const useFetchQuiz = (team, n1, n2, callback) => {
  const [quizList, setQuizList] = useState(null)
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true)
  const [error, setError] = useState(null)
  const [refetchIndex, setRefetchIndex] = useState(0)
  const refetchQuiz = () => setRefetchIndex(refetchIndex => refetchIndex + 1)

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoadingQuiz(true)
      try {
        const quizList = await generateQuiz(team, n1, n2)
        setQuizList(quizList)
        callback()
      } catch (error) {
        setError(error)
      } finally {
        setIsLoadingQuiz(false)
      }
    }
    if (team && team.length > 0) {
      fetchQuiz()
    }
  }, [refetchIndex])
  return { quizList, isLoadingQuiz, refetchQuiz, error }
}

export default useFetchQuiz
