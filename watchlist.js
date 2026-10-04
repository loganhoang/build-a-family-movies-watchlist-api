import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { 
  getWatchlist, 
  addMovie, 
  updateMovie, 
  deleteMovie 
} from "../utils/db.js";

const router = Router();

router.use(authenticate);


router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const list = getWatchlist(userId);
  
  if (!list) {
    return res.status(404).json({ error: "User not found" });
  }
  
  return res.status(200).json(list);
});

router.use("/:userId", authorizeModification);

router.post("/:userId/movies", (req, res) => {
  const userId = Number(req.params.userId);
  const movieData = req.body;

  const newMovie = addMovie(userId, movieData);
  if (!newMovie) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(201).json(newMovie);
});

router.put("/:userId/movies/:movieId", (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const updates = req.body;

  const updatedMovie = updateMovie(userId, movieId, updates);
  if (!updatedMovie) {
    return res.status(404).json({ error: "Movie or User not found" });
  }

  return res.status(200).json(updatedMovie);
});

router.delete("/:userId/movies/:movieId", (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);

  const success = deleteMovie(userId, movieId);
  if (!success) {
    return res.status(404).json({ error: "Movie or User not found" });
  }

  return res.status(200).json({ message: "Movie removed successfully" });
});

export default router;
