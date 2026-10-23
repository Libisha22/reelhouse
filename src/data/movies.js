// Mock catalogue. Images use TMDB's public image CDN (no API key needed); every <img> has a fallback.
// Trailer URLs are public sample clips used purely as a playback demo, not real trailers.
const P = 'https://image.tmdb.org/t/p/w500'
const B = 'https://image.tmdb.org/t/p/w1280'
const V = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/'
const clips = ['BigBuckBunny.mp4', 'Sintel.mp4', 'TearsOfSteel.mp4', 'ElephantsDream.mp4', 'ForBiggerBlazes.mp4', 'ForBiggerEscapes.mp4']
const SF = 'Sci-Fi & Fantasy'
const rows = [
  [1, 'Dune', 2021, 8.0, [SF, 'Adventure'], 'd5NXSklXo0qyIYkgV94XAgMIckC.jpg', 'jYEW5xZkZk2WTrdbMGAPFuBqbDe.jpg', 'Paul Atreides travels to the desert planet Arrakis, where the fate of a universe hangs on the most valuable substance known to humankind.', ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'], 'movie', 96],
  [2, 'Inception', 2010, 8.4, [SF, 'Action'], 'ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg', 's3TBrRGB1iav7gFOCNx3H31MoES.jpg', 'A thief who steals secrets through dream-sharing is offered a chance to erase his past by planting an idea in a target’s mind.', ['Leonardo DiCaprio', 'Elliot Page', 'Tom Hardy'], 'movie', 94],
  [3, 'The Dark Knight', 2008, 8.5, ['Action', 'Crime'], 'qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'nMKdUUepR0i5zn0y1T4CsSB5chy.jpg', 'Batman faces the Joker, a criminal mastermind who pushes Gotham toward chaos and tests the limits of the hero’s code.', ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'], 'movie', 97],
  [4, 'Interstellar', 2014, 8.4, [SF, 'Drama'], 'gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 'xJHokMbljvjADYdit5fK5VQsXEG.jpg', 'With Earth dying, a team of explorers travels through a wormhole in search of a new home for humanity.', ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], 'movie', 93],
  [5, 'The Matrix', 1999, 8.2, [SF, 'Action'], 'f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg', 'A hacker discovers that reality is a simulation and joins a rebellion against the machines that built it.', ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'], 'movie', 88],
  [6, 'Mad Max: Fury Road', 2015, 7.6, ['Action', 'Adventure'], '8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', '', 'In a desert wasteland, Furiosa leads an escape across the sands with a drifter named Max close behind.', ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'], 'movie', 85],
  [7, 'Gladiator', 2000, 8.2, ['Action', 'Drama'], 'ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', '', 'A betrayed Roman general becomes a gladiator and fights his way toward vengeance against the corrupt emperor.', ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'], 'movie', 82],
  [8, 'Avengers: Endgame', 2019, 8.3, ['Action', SF], 'or06FN3Dka5tukK1e9sl16pB3iy.jpg', '', 'The surviving Avengers assemble once more to undo the damage caused by Thanos and restore the universe.', ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'], 'movie', 95],
  [9, 'Spider-Man: Into the Spider-Verse', 2018, 8.4, ['Animation', 'Comedy', 'Action'], 'iiZZdoQBEYBv6id8su7ImL0oCbD.jpg', '', 'Miles Morales becomes Spider-Man and meets heroes from other dimensions who share his powers.', ['Shameik Moore', 'Hailee Steinfeld', 'Jake Johnson'], 'movie', 84],
  [10, 'Knives Out', 2019, 7.9, ['Comedy', 'Mystery'], 'pThyQovXQrw2m0s9x82twj48Jq4.jpg', '', 'A detective investigates the death of a wealthy novelist whose eccentric family all have something to hide.', ['Daniel Craig', 'Ana de Armas', 'Chris Evans'], 'movie', 80],
  [11, 'The Grand Budapest Hotel', 2014, 8.1, ['Comedy', 'Drama'], 'eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', '', 'A legendary concierge and his lobby boy get tangled in the theft of a priceless painting and a family fortune.', ['Ralph Fiennes', 'Tony Revolori', 'Saoirse Ronan'], 'movie', 76],
  [12, 'Jojo Rabbit', 2019, 7.9, ['Comedy', 'Drama'], '7GsM4mtM0worCtIVeiQt28HieeN.jpg', '', 'A lonely boy in wartime Germany discovers his mother is hiding a girl in their attic, and his imaginary friend is not helping.', ['Roman Griffin Davis', 'Thomasin McKenzie', 'Taika Waititi'], 'movie', 70],
  [13, 'Forrest Gump', 1994, 8.5, ['Comedy', 'Drama'], 'arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', '', 'Through decades of American history, a kind-hearted man with a low IQ stumbles into extraordinary events.', ['Tom Hanks', 'Robin Wright', 'Gary Sinise'], 'movie', 89],
  [14, 'Parasite', 2019, 8.5, ['Thriller', 'Drama', 'Comedy'], '7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', '', 'A poor family schemes its way into the lives of a wealthy household, with consequences nobody expected.', ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'], 'movie', 90],
  [15, 'The Shawshank Redemption', 1994, 8.7, ['Drama', 'Crime'], '9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg', '', 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.', ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'], 'movie', 91],
  [16, 'The Godfather', 1972, 8.7, ['Crime', 'Drama'], '3bhkrj58Vtu7enYsRolD1fZdja1.jpg', '', 'The aging patriarch of a crime dynasty hands control of his empire to his reluctant youngest son.', ['Marlon Brando', 'Al Pacino', 'James Caan'], 'movie', 87],
  [17, 'Blade Runner 2049', 2017, 7.6, [SF, 'Thriller'], 'gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', '', 'A young blade runner uncovers a long-buried secret that leads him to track down a vanished former blade runner.', ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'], 'movie', 74],
  [18, 'Jurassic Park', 1993, 8.2, ['Adventure', SF], 'oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg', '', 'A theme park of cloned dinosaurs turns deadly when the security systems fail during a tour.', ['Sam Neill', 'Laura Dern', 'Jeff Goldblum'], 'movie', 83],
  [19, 'Pulp Fiction', 1994, 8.5, ['Crime', 'Thriller'], 'd5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', '', 'The lives of hitmen, a boxer, and a gangster’s wife intertwine across several tales of violence and redemption.', ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'], 'movie', 86],
  [20, 'Fight Club', 1999, 8.4, ['Drama', 'Thriller'], 'pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', '', 'An insomniac office worker and a soap salesman build an underground club that spirals out of control.', ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'], 'movie', 81],
  [21, 'Breaking Bad', 2008, 8.9, ['Drama', 'Crime'], 'ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg', '', 'A high-school chemistry teacher diagnosed with cancer turns to manufacturing drugs to secure his family’s future.', ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'], 'tv', 92],
  [22, 'Stranger Things', 2016, 8.6, [SF, 'Thriller'], '49WJfeN0moxb9IPfGn8AIqMGskD.jpg', '', 'When a boy vanishes, a small town uncovers secret experiments, terrifying forces, and one strange little girl.', ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'], 'tv', 89],
]
export const movies = rows.map(([id, title, year, rating, genres, poster, backdrop, description, cast, type, popularity], i) => ({
  id, title, year, rating, genres, description, cast, type, popularity,
  poster: `${P}/${poster}`,
  backdrop: backdrop ? `${B}/${backdrop}` : `https://image.tmdb.org/t/p/w780/${poster}`,
  trailer: V + clips[i % clips.length],
}))
export const continueWatching = [{ id: 4, progress: 62 }, { id: 22, progress: 35 }, { id: 15, progress: 80 }, { id: 9, progress: 15 }]
