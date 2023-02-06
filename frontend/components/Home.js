import React from 'react'
import { polls } from './utils'
function Home() {
  return (
    <>
    <h1>Active Polls</h1>
      {polls.length !== 0 ? 
      polls.map((poll) => {
        return (
            <p>{poll.name}</p>
        )
      }): 
      <p>There are no active polls</p>
    }
    </>
  )
}

export default Home