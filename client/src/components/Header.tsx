import React from 'react'

function Header() {

    type User={
        username:string,
        lastname:string,
        password:string
    }



    const user: User = {
        username: "Victor",
        lastname:"Ralenko",
        password: "1234"
        
    }
  return (
    <header>
        <div>
            <h1>Welcome back, {user.username}</h1>
           
        </div>
        <div></div>
    </header>
  )
}

export default Header