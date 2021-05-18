import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

import moxios from 'moxios';
import flushPromises from 'flush-promises';

const STARSHIPS_MOCK= [
  { name: 'T-65 X-wing', model: 'X-wing', cost_in_credits: 149999},
  { name: 'T-65 X-wing 2', model: 'X-wing', cost_in_credits: 169999}
]

describe('HelloWorld.vue', () => {
  let wrapper;
  beforeEach(() => {
    moxios.install();
    wrapper = shallowMount(HelloWorld, {});
  })

  afterEach(() => {
    moxios.install();
  })

  it('should render vue links', () => {
      expect(wrapper.html()).toMatchSnapshot();
  })

  it('should have no starships', async () => {
    const starshipList = wrapper.find('.starships');

    expect(starshipList.exists()).toBeFalsy();
  })

  it('should fetch starships on button click', async () => {
    moxios.stubRequest('https://swapi.dev/api/starships/', {
      status: 200,
      response: {
        results: STARSHIPS_MOCK
      }
    });

    wrapper.find('button').trigger('click')
    await moxios.wait();
    await flushPromises();

    const starshipList = wrapper.find('.starships');

    expect(starshipList.isVisible()).toBeTruthy();

    const starships = starshipList.findAll('li');
    expect(starships.length).toBe(2);
  })
})
