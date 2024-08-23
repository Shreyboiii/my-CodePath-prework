import { useState, useEffect } from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { supabase } from './client.js';
import ShowCreators from './pages/ShowCreators.jsx';
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import ViewCreator from './pages/ViewCreator.jsx';

function App() {
  const [creators, setCreators] = useState([]);

  const fetchCreators = async () => {
    const { data: creators, error } = await supabase
      .from('creators')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCreators(creators);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []); 

  let routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators creators={creators} />,
    },
    {
      path: '/add',
      element: <AddCreator fetchCreators={fetchCreators} />,
    },
    {
      path: '/edit/:id',
      element: <EditCreator fetchCreators={fetchCreators} />,
    },
    {
      path: '/view/:id',
      element: <ViewCreator fetchCreators={fetchCreators}/>,
    },
  ]);

  return (
    <>
      <header>
        <h1>CreatoVerse</h1>
        <nav>
          <ul>
            <li>
              <a href='/' role="button">View All Creators</a>
            </li>
            <li>
              <a href='/add' role="button">Add a Creator</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {routes}
      </main>
    </>
  );
};

export default App;
