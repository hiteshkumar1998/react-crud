import React from "react";
const Pagination = (props) => {
    const pageLinks = [];
    const current_page = props.currentPage;
    const total_pages = props.pages;

   // checks current_page greater than one
    pageLinks.push(<li key={Math.random()} className={current_page>1 ? 'page-item' : 'disabled'} {...(current_page > 1 && {onClick:() => props.previousPage(current_page)})} ><a {... current_page>1 && {href:'#'}} className="page-link">{'<'}</a></li>);

   //checks total pages greater than 10
    if(total_pages>10)
    {
        for(let i=1; i<=total_pages; i++)
        {
            //shows pagination links between 5 to 21
            if(current_page>=5 && current_page<=total_pages-4)
            {
                pageLinks.push(<li key={Math.random()} className="page-item" onClick={() => props.nextPage('1')}><a href="#" className="page-link">{'1'}</a></li>);
                pageLinks.push(<li key={Math.random()} className="disable"><a className="page-link">...</a></li>);
                for(let i=current_page-1; i<=current_page+1; i++)
                {
                    pageLinks.push(<li key={Math.random()} className={i===current_page ? 'page-item active' : 'page-item'} onClick={() => props.nextPage(i)}><a href="#" className="page-link">{i}</a></li>);
                }
                pageLinks.push(<li key={Math.random()} className="disable"><a className="page-link">...</a></li>);
                pageLinks.push(<li key={Math.random()} className="page-item" onClick={() => props.nextPage(total_pages)}><a href="#" className="page-link">{total_pages}</a></li>);
                break;
            }
            else
            {
                // shows pagination links first 4
                if(current_page<5)
                {
                    for(let i=1; i<=5; i++)
                    {
                        pageLinks.push(<li key={Math.random()} className={i===current_page ? 'page-item active' : 'page-item'} onClick={() => props.nextPage(i)}><a href="#" className="page-link">{i}</a></li>);
                        if(i===5)
                        {
                            pageLinks.push(<li key={Math.random()} className="disable"><a className="page-link">...</a></li>);
                            pageLinks.push(<li key={Math.random()} className="page-item" onClick={() => props.nextPage(total_pages)}><a href="#" className="page-link">{total_pages}</a></li>); 
                        }
                    }
                    break;
                }
                // shows pagination links of last 5
                if(current_page>=total_pages-3)
                {
                    pageLinks.push(<li key={Math.random()} className="page-item" onClick={() => props.nextPage(1)}><a href="#" className="page-link">{'1'}</a></li>);
                    for(let i = total_pages-4; i <= total_pages; i++)
                    {
                        if(i=== total_pages-4)
                        {
                            pageLinks.push(<li key={Math.random()} className="disable"><a className="page-link">...</a></li>);
                        }
                        pageLinks.push(<li key={Math.random()} className={i===current_page ? 'page-item active' : 'page-item'} onClick={() => props.nextPage(i)}><a href="#" className="page-link">{i}</a></li>);
                    }
                    break;
                }
            }
            
        }
    }
    else
    {
        for(let i=1; i<=total_pages; i++)
        {
            pageLinks.push(<li key={Math.random()} className={i===current_page ? 'page-item active' : 'page-item'} onClick={() => props.nextPage(i)}><a href="#" className="page-link">{i}</a></li>);
        }
    }
    //shows next page button untill reaches last page
    pageLinks.push(<li key={Math.random()} className={current_page<total_pages ? 'page-item' : 'disabled'}  {...(current_page < total_pages && {onClick:() => props.nextPage(current_page+1)})}><a {... current_page<total_pages && {href:'#'}} className="page-link">{'>'}</a></li>);
    return (
        <div>
            <ul className="pagination">
                {pageLinks}
            </ul>
        </div>
    )
}
export default Pagination;