import client from "@/libs/prismadb"

export default async function handler(req, res) {
  const response = await client.movie.deleteMany()
  if (response.count) {
    res.status(200).json({
      message: 'success'
    })
  }
}
