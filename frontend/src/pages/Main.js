import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import moment from 'moment';
import logo from '../assets/logo.svg';
import './Main.css';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: match.params.id }
      });
      setUsers(response.data);

      const response2 = await api.get('/dev', {
        headers: { user: match.params.id }
      });

      setUser(response2.data);
    })();
  }, match.params.id);

  async function handleLike(dev) {
    await api.post(`/devs/${dev._id}/likes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => dev._id !== user._id));
  }
  async function handleDislike(dev) {
    await api.post(`/devs/${dev._id}/dislikes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => dev._id !== user._id));
  }

  return (
    <div>
      <header>
        <div className="navbar navbar-default shadow-sm">
          <div className="container d-flex justify-content-between">
            <Link to={'/'} className="navbar-brand d-flex align-items-center">
              <img src={logo} />
            </Link>
            <img src={user.avatar} width={50} height={50} className={'img-responsive rounded'} />
          </div>
        </div>
      </header>
      <main role="main">
        <div className="album py-5 bg-light">
          <div className="container">
            {users.length === 0 && (
              <div className={'alert alert-info text-center'}>Acabou :(</div>
            )}
            <div className="row">
              <div className="card-deck">
                {users.map(user => (
                  <div className="col-md-4" key={user._id}>
                    <div className="card mb-4 shadow-sm">
                      <img
                        src={user.avatar}
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.bio}</p>
                      </div>
                      <div className={'card-footer'}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              onClick={() => handleDislike(user)}
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                            >
                              <i className="fas fa-thumbs-down" />
                            </button>
                            <button
                              onClick={() => handleLike(user)}
                              type="button"
                              className="btn btn-sm btn-outline-success"
                            >
                              <i className="fas fa-thumbs-up" />
                            </button>
                          </div>
                          <small className="text-muted">
                            {moment(user.created_at).fromNow()}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-muted">
        <div className="container">
          <p className="float-right">
            <a href="#" className={'text-danger'}>
              Back to top
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
