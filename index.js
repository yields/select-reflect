
/**
 * dependencies
 */

var query = require('query');
var each = require('each');

/**
 * Export `reflect`
 */

module.exports = reflect;

/**
 * Reflect the given `el` to `Select` instance.
 *
 * @param {Element} el
 * @param {Select} select
 * @return {Select}
 * @api public
 */

function reflect(el, select){
  var els = [].slice.call(el)
    , multi = el.multiple
    , hasLabel
    , label;

  // label
  if (els[0] && !els[0].hasAttribute('value')) {
    label = els[0];
    select.label(els[0].textContent);
    hasLabel = true;
    els.shift();
  }

  // multiple
  if (multi) select.multiple();

  // add
  each(els, function(opt, i){
    var name = opt.textContent;
    var value = opt.getAttribute('value');
    var selected = opt.selected;
    select.add(name, value);
    if (selected) select.select(name);
  });

  // selected
  select.on('select', function(opt){
    option(opt, el).selected = true;
  });

  // deselect
  select.on('deselect', function(opt){
    option(opt, el).selected = false
  });

  // all done
  return select;
}

/**
 * Get an option with `val`.
 *
 * @param {String} val
 * @param {Element} ctx
 * @return {Element|Object}
 * @api private
 */

function option(opt, ctx){
  return query('[value="' + opt.value + '"]', ctx) || {};
}
