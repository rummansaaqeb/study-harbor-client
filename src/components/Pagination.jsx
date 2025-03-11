
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-end items-center mt-8 gap-4">
            <button onClick={() => onPageChange(currentPage - 1)} className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white" disabled={currentPage === 1}>Previous</button>
            <span className="font-bold">{currentPage} / {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} className="btn btn-sm btn-outline font-bold hover:bg-black hover:text-white" disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;