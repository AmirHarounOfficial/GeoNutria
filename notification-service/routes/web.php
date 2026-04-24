<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/notifications', 'NotificationController@index');
$router->get('/notifications/unread-count', 'NotificationController@unreadCount');
$router->put('/notifications/{id}/read', 'NotificationController@markAsRead');
