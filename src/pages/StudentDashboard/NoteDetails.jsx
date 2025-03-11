
const NoteDetails = ({ note, closeModal }) => {
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold">{note.title}:</h2>
                <p className="mt-5">{note.description}</p>
                <button onClick={closeModal} className="btn btn-lg w-full btn-outline font-bold hover:bg-black hover:text-white mt-5">Close</button>
            </div>
        </div>
    );
};

export default NoteDetails;
