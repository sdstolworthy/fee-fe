import { shallowMount } from '@vue/test-utils';
import Home from '@/views/FE-Home.vue';

describe('FE-Home.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Home, {
    });
    expect(wrapper.text()).toMatch('Home');
  });
});
