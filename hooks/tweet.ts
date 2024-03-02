import { graphQLClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutations/tweets"
import { getAllTweetsQuery } from "@/graphql/query/tweets"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet=()=>{
    const queryClient=useQueryClient()
    const mutation=useMutation({
       mutationFn:(payload:CreateTweetData)=>graphQLClient.request(createTweetMutation, {payload}),
       onMutate:()=>toast.loading('Creating Tweet',{id:"1"}),
       onSuccess:async()=>{
            await queryClient.invalidateQueries(['All-Tweets']);
            toast.success('Tweet Created',{id:"1"})
        },

    })
    return mutation
}

export const useGetAllTweets=()=>{
    const query=useQuery({
        queryKey:['All-tweets'],
        queryFn:()=> graphQLClient.request(getAllTweetsQuery)
        
    })
    return {...query, tweets: query.data?.getAllTweets};
}