// import Container from 'react-bootstrap/Container';
// import { Link, useLocation } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// export default function SigninScreen() {
//   const { search } = useLocation();
//   const redirectInUrl = new URLSearchParams(search).get('redirect');
//   const redirect = redirectInUrl ? redirectInUrl : '/';
//   return (
//     <Container className="small-container">
//       <Helmet>
//         <title>Sign In</title>
//       </Helmet>
//       <h1 className="my-3"> Sign In</h1>
//       <Form className="form-signin">
//         <Form.Group className="mb-3" contolId="username">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//         <Form.Group className="mb-3" contolId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" />
//         </Form.Group>
//       </Form>
//       <Form>
//         <div className="mb-3">
//           <Button type="submit">Sign In</Button>
//         </div>
//         <div className="mb-3">
//           New customer? {''}
//           <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
//         </div>
//       </Form>
//     </Container>
//   );
// }
