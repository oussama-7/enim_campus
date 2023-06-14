import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from './Nav2';
import { getError } from '../../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { AuthContext } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    summary: { users: [], orders: [], dailyOrders: [] },
  });

  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const { data } = await axios.get(
          'http://localhost:8800/api/orders/summary',
          {
            withCredentials: true,
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Nav />
      <Helmet>
        <title>Tableau de Bord</title>
      </Helmet>
      <div style={{marginTop:"20px"}}>
      <h1 className='text-center'>Tableau de bord</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text> Utilisateurs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                  {summary.orders && summary.orders.numOrders 
                      ? summary.orders.numOrders
                      : 0}
                  </Card.Title>
                  <Card.Text> Montant total</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                  
                  {summary.orders && summary.orders.totalSales 
                      ? summary.orders.totalSales.toFixed(2)
                      : 0}{' '}
                    DH
                  </Card.Title>
                  <Card.Text> Montant Total</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Ventes</h2>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>Pas de ventes</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Chargement...</div>}
                data={[
                  ['Date', 'Ventes'],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Catégories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>Pas de catégories</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Chargement...</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
}