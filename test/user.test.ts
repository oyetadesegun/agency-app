import { createUser } from "@/app/action/user.actions"

async function main() {
  const result = await createUser({
    username: "johnwell",
    email: "johnwellacademy@gmail.com",
    firstName: "John",
    lastName: "Well",
    phone: "08012345678",
    password: "mypassword",
    referredBy: "agent123"
  })

  console.log(result)
}

main()
