const SnakeView = require('./snake_view.js');

$l(function () {
  const rootEl = $l('.snake-game');
  new SnakeView(rootEl);
});
