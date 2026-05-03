import { useState } from "react"

import {
  askMechanicAssistant
} from "../services/api"


function MechanicChat({
  diagnosis
}) {

  const [question, setQuestion] =
    useState("")

  const [messages, setMessages] =
    useState([])

  const [loading, setLoading] =
    useState(false)


  const askQuestion = async () => {

    if (!question.trim()) {
      return
    }

    try {

      setLoading(true)

      const userQuestion = question

      setMessages(prev => [
        ...prev,
        {
          role: "user",
          content: userQuestion
        },
        {
          role: "assistant",
          content: ""
        }
      ])

      setQuestion("")

      const diagnosisSummary = `
        Root Cause:
        ${diagnosis.root_cause}

        Summary:
        ${diagnosis.summary}
      `

      await askMechanicAssistant(
        {
          question: userQuestion,

          diagnosis_summary:
            diagnosisSummary
        },

        (streamedText) => {

          setMessages(prev => {

            const updated = [...prev]

            updated[
              updated.length - 1
            ] = {
              role: "assistant",
              content: streamedText
            }

            return updated
          })
        }
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }


  return (
    <div className="
      rounded-2xl
      bg-slate-900
      p-8
      space-y-6
    ">

      <div>

        <h3 className="
          text-2xl
          font-bold
        ">
          AI Mechanic Assistant
        </h3>

        <p className="
          mt-2
          text-slate-400
        ">
          Ask follow-up questions
          about your diagnosis.
        </p>

      </div>


      <div className="
        max-h-96
        space-y-4
        overflow-y-auto
      ">

        {messages.map(
          (message, index) => (

          <div
            key={index}
            className={`
              rounded-xl
              p-4
              whitespace-pre-wrap

              ${
                message.role === "user"
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }
            `}
          >

            <p className="
              mb-2
              text-sm
              font-semibold
            ">

              {message.role === "user"
                ? "You"
                : "AI Mechanic"
              }

            </p>

            <p>
              {message.content}
            </p>

          </div>
        ))}

      </div>


      <div className="
        flex
        gap-4
      ">

        <input
          type="text"
          placeholder="
            Can I drive this car safely?
          "
          value={question}
          onChange={(event) =>
            setQuestion(
              event.target.value
            )
          }
          className="
            flex-1
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            outline-none
          "
        />


        <button
          onClick={askQuestion}
          disabled={loading}
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            hover:bg-blue-500
            disabled:opacity-50
          "
        >

          {loading
            ? "Thinking..."
            : "Ask"
          }

        </button>

      </div>

    </div>
  )
}


export default MechanicChat