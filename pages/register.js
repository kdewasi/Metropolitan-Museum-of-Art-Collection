import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Card } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password, password2);
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        {error && <p>{error}</p>}
      </Card.Body>
    </Card>
  );
};