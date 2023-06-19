import React from "react";

interface Props extends React.ComponentPropsWithoutRef<'nav'> {
  totalPages: number
  activePage?: number
  listOffset?: number
  previous?: React.ReactNode | string | boolean
  next?: React.ReactNode | string | boolean
  ariaLabel?: string
  isRounded?: boolean
  size?: 'small' | 'medium' | 'large'
  onNavigate?: (index: number) => void
}

/* Description: Bulma pagination wrapper.
 *
 * Props (also includes NextImage props):
 * - totalPages: total number of pages;
 * - activePage: current page;
 * - listOffset: limit of items to display offsetting from active page
 * (e.g. 2 before and 2 after it);
 * - previous: text to display on 'previous' button if set to true it will use
 * a default value;
 * - next: text to display on 'next' button if set to true it will use a
 * default value;
 * - ariaLabel: aria-label property;
 * - isRounded: apply rounded style;
 * - size: size of the items;
 * - onNavigate: method to be called when clicking an item;
 */
function Pagination({
  className,
  totalPages,
  size,
  activePage=0,
  listOffset=2,
  previous=true,
  next=true,
  isRounded=false,
  role="navigation",
  ariaLabel="navigation",
  onNavigate,
  ...props
}: Props) {
  let classNames = [className, 'pagination'];
  if (isRounded) classNames.push('is-rounded');
  if (size) classNames.push(`is-${size}`);

  if (next === true) next = 'Next';
  if (previous === true) previous = 'Previous';

  const handleClick = (index: number): void => {
    if (index < 0 || index > totalPages - 1)
      return
    if (onNavigate)
      onNavigate(index);
  }

  const ellipsis = <span className="pagination-ellipsis">&hellip;</span>;

  const createItem = (item: number) => {
    return (
      <a
        className={item === activePage ? "pagination-link is-current" : "pagination-link"}
        aria-label={`Goto page ${item}`}
        onClick={() => handleClick(item)}
      >
        {item + 1}
      </a>
    )
  }

  let itemsToDisplay = [];
  if (activePage - listOffset > 0) itemsToDisplay.push(ellipsis);
  for (let i = activePage - listOffset ; i <= activePage + listOffset ; i++) {
    if (i < 0 || i > totalPages - 1)
      continue
    itemsToDisplay.push(createItem(i));
  }
  if (activePage + listOffset < totalPages - 1) itemsToDisplay.push(ellipsis);

  return (
    <nav className={classNames.join(' ')} role={role} aria-label={ariaLabel} {...props}>
      {previous &&
        <a
          className="pagination-previous"
          onClick={() => handleClick(activePage - 1)}>{previous}
        </a>
      }
      {next &&
        <a
          className="pagination-next"
          onClick={() => handleClick(activePage + 1)}>{next}
        </a>
      }
      <ul className="pagination-list">
        <li>
          {itemsToDisplay.map((item, index) =>
            <React.Fragment key={index}>{item}</React.Fragment>)
          }
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;
