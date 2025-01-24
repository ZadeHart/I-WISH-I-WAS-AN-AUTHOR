// import { BookDocument } from "../models/Book.js";
import User from "../models/User.js";
import { signToken } from '../services/auth.js';

// interface IUser {
//     _id: string;
//     username: string;
//     email: string;
//     password: string;
//     savedBooks: BookDocument[];
//     isCorrectPassword(password: string): Promise<boolean>;
//     bookCount: number;
// }

// interface ICreateUserArgs {
//     input: {
//         username: string;
//         email: string;
//         password: string;
//     }

// }

// interface ILoginArgs {
//     input: {
//         email: string;
//         password: string;
//     }
// }

// interface ISaveBookArgs {
//     userId: string;
//     title: string;
//     authoers: string[];
//     description: string;
//     image: string;
//     link: string;

// }

// interface IDeleteBookArgs {
//     userId: string;
//     title: string;
//     authoers: string[];
//     description: string;
//     image: string;
//     link: string;

// }

const resolvers = {
    Query: {
        getSingleUser: async (_parent: unknown, args: { id?: string; username?: string }, context: { user: any }) => {
        const { id, username } = args;
        const userId = context.user?._id || id;
    
        const foundUser = await User.findOne({
            $or: [{ _id: userId }, { username }],
        });
    
        if (!foundUser) {
            throw new Error('Cannot find a user with this ID or username!');
        }
    
        return foundUser;
        },
    },
    
    Mutation: {
        createUser: async (_parent: unknown, args: { username: string; email: string; password: string }) => {
        const user = await User.create(args);
    
        if (!user) {
            throw new Error('Something went wrong while creating the user!');
        }
    
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
        },

        loginUser: async (_parent: unknown, args: { username?: string; email?: string; password: string }) => {
        const { username, email, password } = args;
    
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            throw new Error("Can't find this user.");
        }
    
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new Error('Wrong password!');
        }
    
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
        },
    
        saveBook: async (_parent: unknown, args: { book: any }, context: { user: any }) => {
        if (!context.user) {
            throw new Error('Unauthorized');
        }
    
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.book } },
                { new: true, runValidators: true }
            );
            return updatedUser;
            } catch (err) {
            console.error(err);
            throw new Error('Failed to save the book.');
            }
        },

        deleteBook: async (_parent: unknown, args: { bookId: string }, context: { user: any }) => {
        if (!context.user) {
            throw new Error('Unauthorized');
        }
    
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
        );
    
        if (!updatedUser) {
            throw new Error("Couldn't find a user with this ID!");
        }
    
        return updatedUser;
        },
    },
            
}

export default resolvers;