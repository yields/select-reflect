
/**
 * dependencies
 */

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
  }

  // multiple
  if (multi) select.multiple();

  // add
  each(els, function(opt, i){
    if (0 == i && hasLabel) return;
    var name = opt.textContent;
    var value = opt.getAttribute('value');
    var selected = opt.selected;
    select.add(name, value);
    if (selected) select.select(name);
  });

  // changes
  select.on('change', function(){
    each(select.options, function(opt, i){
      if (hasLabel) i += 1;
      els[i].selected = opt.selected;
    });
  });

  // all done
  return select;
}
