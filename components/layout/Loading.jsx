const Loading = ({ item }) => {
  if (item === 'badge') {
    return (
      <div className='w-5 h-5 border-b-4 border-gray-900 rounded-full animate-spin'></div>
    )
  }
  return (
    <div className='w-32 h-32 border-b-4 border-gray-900 rounded-full animate-spin'></div>
  )
}

export default Loading
