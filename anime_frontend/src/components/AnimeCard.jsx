import { useState } from "react";
import { MotionDiv } from "./MotionDiv";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";
import ActionModal from "./ActionModal";

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

function AnimeCard({ anime, index, onDelete }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MotionDiv
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{
                    delay: index * 0.25,
                    ease: "easeInOut",
                    duration: 0.5,
                }}
                viewport={{ amount: 0 }}
                className="max-w-sm rounded relative w-full"
            >
                <div className="relative w-full h-[37vh]">
                    <img
                        src={anime.image}
                        alt={anime.title}
                        className="rounded-xl object-cover w-full h-full"
                    />
                    <button
                        onClick={() => setOpen(true)}
                        className="absolute top-0 right-0 m-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-1"
                        aria-label="Delete anime"
                    >
                        <AiOutlineDelete size="20" />
                    </button>
                </div>
                <div className="py-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-1">
                        <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
                            {anime.title}
                        </h2>
                        <div className="py-1 px-2 bg-[#161921] rounded-sm">
                            <p className="text-white text-sm font-bold capitalize">
                                {anime.kind}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src="./assets/episodes.svg"
                                alt="episodes"
                                width="20"
                                height="20"
                                className="object-contain"
                            />
                            <p className="text-base text-white font-bold">
                                {anime.episodes || anime.episodes_aired}
                            </p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src="./assets/star.svg"
                                alt="star"
                                width="18"
                                height="18"
                                className="object-contain"
                            />
                            <p className="text-base font-bold text-[#FFAD49]">
                                {anime.score}
                            </p>
                        </div>
                    </div>
                </div>
            </MotionDiv>
            <ActionModal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-56">
                    <AiOutlineDelete
                        size={56}
                        className="mx-auto text-red-500"
                    />
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this item?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={onDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
}
AnimeCard.propTypes = {
    anime: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        episodes: PropTypes.number.isRequired,
        episodes_aired: PropTypes.number.isRequired,
        score: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AnimeCard;
