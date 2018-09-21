// Test Methods and Mock Dependencies in Vue.js with Jest

  
import { shallowMount } from '@vue/test-utils'
import Form from '@/components/Form'
// import Form from '../src/components/Form'
import axios from 'axios' // axios here is the mock from above!

describe('Form.test.js', () => {
    let cmp

    beforeEach(() => {
        cmp = shallowMount(Form)
        jest.resetModules()
        jest.clearAllMocks()
    })


    it('Calls axios.get and checks promise result', async () => {
        const result = await cmp.vm.onSubmit('an')
      
        expect(result).toEqual({ data: [3] })
        expect(cmp.vm.results).toEqual([3])
        expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/posts?q=an')
    })

    // it('Axios should not be called here', () => {
        // expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/posts?q=an')

    // })

    // Testing Computed Properties
    describe('Properties', () => {
        it('returns the string in normal order if reversed property is not true', () => {
            cmp.vm.inputValue = 'Yoo'
            expect(cmp.vm.reversedInput).toBe('Yoo')
        })

        it('returns the reversed string if reversed property is true', () => {
            cmp.vm.inputValue = 'Yoo'
            // @vue/test-utils give us a helper method setProps({ property: value, ... }) 
            cmp.setProps({ reversed: true })
            expect(cmp.vm.reversedInput).toBe('ooY')
        })
    })

    // Testing Watchers
    describe('Watchers - inputValue', () => {
        let spy

        beforeAll(() => {
            //  using a spy on the console.log method, initializing before starting any test, and resetting its state after each of them, so that they start from a clean spy.
            spy = jest.spyOn(console, 'log')
        })

        afterEach(() => {
            spy.mockClear()
        })

        it('is not called if value is empty (trimmed)', () => {
            cmp.setData({ inputValue: '   ' })
            expect(spy).not.toBeCalled()
        })

        it('is not called if values are the same', () => {
            cmp = shallowMount(Form, {
                data: () => ({ inputValue: 'foo' })
              })
            cmp.setData({ inputValue: 'foo' })
            expect(spy).not.toBeCalled()

        })

        it('is called with the new value in other cases', () => {
            cmp.setData({ inputValue: 'foo' })
            expect(spy).toBeCalled()
        })
    })
})