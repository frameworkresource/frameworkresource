package com.android.androidappexp

import android.os.Bundle
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import com.android.androidappexp.databinding.ActivityMainBinding
import com.android.androidappexp.network.Repository
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch


class MainActivity : AppCompatActivity() {

    private val binding: ActivityMainBinding by lazy {
        ActivityMainBinding.inflate(layoutInflater)
    }

    private val repository = Repository()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        lifecycleScope.launchWhenResumed {
            val list: MutableList<String> = mutableListOf()
            val parameters = (repository.started()).split("-")
            for (i in 0 until parameters[1].toInt()) {
                list.add("img${(i % 28) + 1}")
            }
            binding.list.layoutManager = GridLayoutManager(this@MainActivity, parameters[2].toInt())
            binding.list.adapter = ImagesAdapter(
                list.map {
                    val id = this@MainActivity.resources.getIdentifier(
                        it,
                        "drawable",
                        this@MainActivity.packageName
                    )
                    getDrawable(id)!!
                },
                this@MainActivity::afterLastItemBind
            )
        }

    }

    private fun afterLastItemBind(){
        lifecycleScope.launch {
            delay(22000L)
            repository.logData()
            repository.done()
        }
    }
}