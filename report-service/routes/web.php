<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/reports', 'ReportController@list');
$router->post('/reports/generate', 'ReportController@generate');
