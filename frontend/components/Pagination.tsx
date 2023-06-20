import React from "react";

interface Props extends React.ComponentPropsWithoutRef<'nav'> {
  totalPages: number
  activePage?: number
  maxListSize?: number
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
 * - maxListSize: limit of items to display;
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
  maxListSize=5,
  previous=true,
  next=true,
  isRounded=false,
  role="navigation",
  ariaLabel="navigation",
  onNavigate,
  ...props
}: Props) {

  if (totalPages < 2)
    return <div className="block"></div>

  let classNames = [className, 'pagination', 'is-left'];
  if (isRounded) classNames.push('is-rounded');
  if (size) classNames.push(`is-${size}`);

  if (next === true) next = 'Next';
  if (previous === true) previous = 'Previous';
  const halfListSize = Math.floor(maxListSize / 2);

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
  let count = 0;
  let currentItem = activePage - halfListSize;
  if (activePage + halfListSize >= totalPages) {
    // If it's too close to the end, start earlier
    currentItem = activePage - halfListSize - (halfListSize + activePage + 1 - totalPages);
  }
  if (currentItem < 0) {
    // If it's too close to the beginning, start later
    currentItem = 0;
  }
  if (currentItem > 0) {
    currentItem++;
    count++;
    itemsToDisplay.push(ellipsis);
  }

  while (count < maxListSize && currentItem < totalPages) {
    itemsToDisplay.push(createItem(currentItem));
    currentItem++;
    count++;
  }
  if (currentItem < totalPages) {
    itemsToDisplay.pop();
    itemsToDisplay.push(ellipsis);
  }

  return (
    <nav className={classNames.join(' ')} role={role} aria-label={ariaLabel} {...props}>
      <ul className="pagination-list">
        <li>
          {itemsToDisplay.map((item, index) =>
            <React.Fragment key={index}>{item}</React.Fragment>)
          }
        </li>
      </ul>
      {previous && activePage > 0 &&
        <a
          className="pagination-previous"
          onClick={() => handleClick(activePage - 1)}>{previous}
        </a>
      }
      {next && activePage < totalPages - 1 &&
        <a
          className="pagination-next"
          onClick={() => handleClick(activePage + 1)}>{next}
        </a>
      }
    </nav>
  )
}

export default Pagination;
