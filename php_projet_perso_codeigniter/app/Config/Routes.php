<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
//$routes->get('Test/index', 'Test::index');
//$routes->get('Dashboard/index', 'Dashboard::index');
$routes->setAutoRoute(true);
