"use client";

import { useState } from 'react';
import Button from './Button';
import Icon from './Icon';
import Pagination from './Pagination';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';


interface Props {
  id: string
  perPage: number
  firstItemNumber: number
  lastItemNumber: number
  total: number
  activePage: number
  setActivePage: React.Dispatch<React.SetStateAction<number>>
  setPerPage: React.Dispatch<React.SetStateAction<number>>
  useDropup?: boolean
}


/* Description: implements a pagination element for CRUDs
 *
 * Props:
 * - id: unique identifier for this pagination;
 * - perPage: number of items per page;
 * - firstItemNumber: value of the first item (to be shown on UI);
 * - lastItemNumber: value of the last item (to be shown on UI);
 * - total: total of items;
 * - activePage: current active page;
 * - setActivePage: state hook setter for updating the active page;
 * - setPerPage: state hook setter for updating the number of items per page;
 * - useDropup: whether to use dropdown or dropup for the perPage select;
 */
function CRUDPagination({
  id,
  useDropup,
  perPage,
  firstItemNumber,
  lastItemNumber,
  total,
  activePage,
  setActivePage,
  setPerPage,
}: Props) {
  const [perPageInput, setPerPageInput] = useState(String(perPage));
  const [perPageDropdown, setPerPageDropdown] = useState(false);

  const dropdownClasses = ['dropdown', 'is-right'];
  if (useDropup) dropdownClasses.push('is-up');
  if (perPageDropdown) dropdownClasses.push('is-active');

  const handleSetPerPage = () => {
    const value = parseInt(perPageInput);   // Input returns string
    setPerPageDropdown(false);
    if (isNaN(value)) {
      setPerPageInput(String(perPage));
    } else if (value !== perPage) {
      setActivePage(Math.floor((firstItemNumber - 1) / value));
      setPerPage(value);
    }
  }

  return (<>
    <Pagination
      totalPages={Math.ceil(total / perPage)}
      activePage={activePage}
      previous
      next
      onNavigate={setActivePage}
      isRounded
    />
    <div className='level is-mobile'>
      <div className='level-left'></div>
      <div className='level-right'>
        <div className='level-item'>
          <span>
            {firstItemNumber} - {lastItemNumber} out of {total}
          </span>
        </div>
        <div className='level-item'>
          <div className={dropdownClasses.join(' ')}>
            <div className="dropdown-trigger">
              <Button
                color='normal'
                variant='rounded'
                aria-haspopup="true"
                aria-controls={`crud-perpage-${id}`}
                onClick={() => setPerPageDropdown(!perPageDropdown)}
              >
                <span>{perPage} per page</span>
                <Icon icon={faChevronDown}/>
              </Button>
            </div>
            <div className="dropdown-menu" id={`crud-perpage-${id}`}>
              <div className="dropdown-content px-4 py-4">
                <div className='field has-addons is-rounded'>
                  <div className='control'>
                    <input
                      className='mb-2 is-rounded'
                      type="number"
                      min={1}
                      value={perPageInput}
                      onChange={(e) => setPerPageInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className='control'>
                    <Button color='info' variant='rounded' onClick={handleSetPerPage}>Reload</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>)
}

export default CRUDPagination;
