import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/api';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await api.post('/devs', { username });
    const {_id} = result.data;

    history.push(`/main/${_id}`);
  }

  return (
    <div className={'text-center body'}>
      <form className="form-signin" onSubmit={handleSubmit}>
        <img className="mb-4" src={logo} alt="" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoFocus
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Entrar
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
      </form>
    </div>
  );
}
