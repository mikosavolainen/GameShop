import { useContext, useEffect } from 'react'
import { useParams } from 'wouter'
import default_pfp from '../assets/default_pfp.jpg'
import Button from './Button'
import GameDisplay from './GameDisplay'
import { AuthContext } from '../wrappers/AuthWrapper'
import test_image_wrench from '../assets/test_image_wrench.png'
import test_image_wrench_2 from '../assets/test_image_wrench_2.png'

export default function UserPageContent() {
  const params = useParams()
  useEffect(() => {
    async function fetch() {
      // 100% not copy pasted from GamePage.tsx
      console.log(params.user)
    }
    fetch()
  }, [params.user])
  const { user } = useContext(AuthContext) //this is for checking if user is logged in meaning if not logged in user cannot see the stff to change things.
  function Profile() {
    return (
      <>
        <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-3xl p-6">
          <img
            alt="Default profile picture"
            src={default_pfp}
            className="size-56 rounded-full"
          />
          <div>
            <p className="font-medium text-5xl mt-2">{params.user}</p>
            <p>
              User description but its long af but its long af but its long af
              but its long af but its long af but its long af but its long af
              but its long af but its long af but its long af but its long af
              but its long af but its long af but its long af but its long af
              but its long af but its long af but its long af but its long af
              but its long af but its long af but its long af but its long af{' '}
            </p>
            <p className="text-wrench-neutral-2 mb-2">Joined user join date</p>
            <p>Games:600 Reviews:600</p>
            {params.user == user?.username && ( //Data privacy guys can fix this
              <>
                <Button
                  className="mt-6"
                  type="button"
                  icon="edit"
                  text="Edit profile"
                />
              </>
            )}
          </div>
        </div>
      </>
    )
  }
  function Library() {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            review={`${user?.username == params.user ? `send` : `none`}`}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            review={`${user?.username == params.user ? `edit` : `none`}`}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
          <GameDisplay
            classname="pb-5"
            id="test"
            gameName="gameName"
            price={40}
            description="Test"
            size="small"
            categories={['Cool']}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className="lg:flex gap-5">
        <div className="lg:w-2/3 mb-4">
          <Profile />
        </div>
        <Library />
      </div>
    </>
  )
}
