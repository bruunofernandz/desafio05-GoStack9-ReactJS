import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import api from '../../services/api';

import Container from '../../components/Container/index';

import { Form, SubmitButton, List, ButtonDelete } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Carregar Dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleDelete = (keyName) => {
    this.setState(() => {
      localStorage.removeItem(JSON.stringify(keyName));
    });
  };

  handleInputChange = (e) => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    if (newRepo === '') {
      NotificationManager.warning('O campo esta vazio', 'Erro', 2000);

      this.setState({ loading: false });
    } else {
      try {
        const hasRepo = repositories.find((r) => r.name === newRepo);

        if (hasRepo) throw Error('Error');

        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };

        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
        });

        NotificationManager.success(
          'O Repositório foi adicionado com sucesso !',
          'Success',
          2000
        );
      } catch (err) {
        this.setState({ loading: false });
        NotificationManager.error(
          'Repositório duplicado ou não encontrado',
          `${err}`,
          4000
        );
      }
    }
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <NotificationContainer />

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
                <ButtonDelete
                  onClick={() => this.handleDelete(repository.name)}
                >
                  <FaTrash color="#f002" size={12} />
                </ButtonDelete>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
