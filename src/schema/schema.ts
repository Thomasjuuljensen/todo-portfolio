import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Todo from "../models/Todo";

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: {type: GraphQLID},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todos: {
      type: GraphQLList(TodoType),
      resolve(parentValue, args) {
        return Todo.find();
      },
    },
    todo: {
      type: TodoType,
      args: {id: {type: GraphQLID}},
      resolve(parentValue, args) {
        return Todo.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        description: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, args) {
        const todo = new Todo({
          description: args.description,
          completed: false,
          deleted: false,
        });
        return todo.save();
      },
    },
    deleteProject: {
      type: TodoType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parentValue, args) {
        return Todo.findByIdAndUpdate(args.id, {
          $set: {
            deleted: true,
          },
        });
      },
    },
    updateProject: {
      type: TodoType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        description: {type: GraphQLString},
        completed: {type: GraphQLBoolean},
      },
      resolve(parentValue, args) {
        return Todo.findByIdAndUpdate(
          args.id,
          {
            $set: {
              description: args.description,
              completed: args.completed,
            },
          },
          {new: true}
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
