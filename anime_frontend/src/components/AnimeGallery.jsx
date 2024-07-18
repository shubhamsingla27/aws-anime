import { useEffect, useState } from 'react';
import AnimeCard from "./AnimeCard";
import ActionModal from './ActionModal';

function Home() {
  const [animeData, setAnimeData] = useState([]);
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image: 'https://picsum.photos/200/300',
    kind: 'TV',
    episodes: 12,
    episodes_aired: 12,
    score: 5.00,
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/animes/')
      .then(response => response.json())
      .then(data => setAnimeData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // The empty array ensures this effect runs only once after the initial render

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/animes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      setAnimeData([...animeData, data]);
      setOpen(false); // Close the modal on success
    })
    .catch(error => console.error('Error posting data:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/animes/${id}/`, {
      method: 'DELETE',
    }).then((response) => {
      console.log(response);
      setAnimeData(animeData.filter(anime => anime.id !== id));
    })
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-white font-bold">Explore Anime</h2>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"  onClick={() => setOpen(true)}>Add Anime</button>
      </div>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {animeData.map((item, index) => (
          <AnimeCard key={item.id} anime={item} index={index} onDelete={()=>handleDelete(item.id)} />
        ))}
      </section>

      <ActionModal open={open} onClose={() => setOpen(false)}>
        <div className=" w-[30rem]">
          <form>
          {/* <form className="mb-4 bg-white p-4 shadow-md rounded-lg"> */}
            <div className="mb-2">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input type="text" id="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded shadow appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image URL</label>
              <input type="text" id="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded shadow appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
              <label htmlFor="kind" className="block text-gray-700 font-bold mb-2">Kind</label>
              <input type="text" id="kind" value={formData.kind} onChange={handleChange} className="w-full px-3 py-2 border rounded shadow appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
              <label htmlFor="episodes" className="block text-gray-700 font-bold mb-2">Episodes</label>
              <input type="number" id="episodes" value={formData.episodes} onChange={handleChange} className="w-full px-3 py-2 border rounded shadow appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
              <label htmlFor="episodes_aired" className="block text-gray-700 font-bold mb-2">Episodes Aired</label>
              <input type="number" id="episodes_aired" value={formData.episodes_aired} onChange={handleChange} className="w-full px-3 py-2 border rounded shadow appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="score" className="block text-gray-700 font-bold mb-2">Score</label>
              <input type="text" id="score" value={formData.score} onChange={handleChange} className="w-full px-3 py-2 border rounded shadow appearance-none bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </form>
          <div className="flex justify-end gap-4">
            <button
              className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>


        </div>
      </ActionModal>
    </main>
  );
}

export default Home;