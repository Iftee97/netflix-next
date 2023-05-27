import client from "@/libs/prismadb"

export default async function handler(req, res) {
  const movies = req.body
  const response = await client.movie.createMany({
    data: movies
  })
  if (response.count) {
    res.status(200).json({
      message: 'success'
    })
  }
}
