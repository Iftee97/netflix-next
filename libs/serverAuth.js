import { getServerSession } from "next-auth"
import prismadb from '@/libs/prismadb'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function serverAuth(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    throw new Error('Not signed in')
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  })
  if (!currentUser) {
    throw new Error('Not signed in')
  }

  return {
    currentUser
  }
}
